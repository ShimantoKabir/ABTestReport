import { UserInteractorBoundary } from "./boundaries/UserInteractorBoundary";
import { UserRequestModel } from "./domain/UserRequestModel";
import { UserResponseModel } from "./domain/UserResponseModel";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { Inject, Injectable } from "@nestjs/common";
import { UP, UserPresenter } from "./presenters/UserPresenter";
import { UserEntity } from "../adapter/data/entities/UserEntity";
import * as bcrypt from "bcrypt";
import { AppConstants } from "../common/AppConstants";
import { US, UserService } from "../adapter/data/services/UserService";
import { ADB, AuthDtoBuilder } from "../dto/builders/AuthDtoBuilder";
import { AuthDto } from "../dto/AuthDto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { URMB, UserRequestModelBuilder } from "./domain/builders/UserRequestModelBuilder";

@Injectable()
export class UserInteractor implements UserInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(UP)
    private readonly userPresenter: UserPresenter,
    @Inject(ADB)
    private readonly authDtoBuilder: AuthDtoBuilder,
    @Inject(URMB)
    private readonly userRequestModelBuilder: UserRequestModelBuilder,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
  }

  async login(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    const user = await this.userService.getUserByEmail(userRequestModel.email);

    const nullAuthDto = this.authDtoBuilder.withAuthToken(null)
      .withRefreshToken(null)
      .build();

    if (!user) {
      return this.userPresenter.buildLoginOrRefreshResponse(nullAuthDto);
    }

    const isMatch = await bcrypt.compare(userRequestModel.password, user.password);

    if (isMatch) {
      userRequestModel.id = user.id;
      const authDto = await this.getTokens(userRequestModel);
      return this.userPresenter.buildLoginOrRefreshResponse(authDto);
    }

    return this.userPresenter.buildLoginOrRefreshResponse(nullAuthDto);
  }

  async register(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    userRequestModel.msg = IOMsg.REGISTRATION_SUCCESS;
    userRequestModel.code = IOCode.OK;

    try {

      const user = await this.userService.getUserByEmail(userRequestModel.email);

      if (user) {
        userRequestModel.msg = IOMsg.USER_EXIST;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.registrationResponse(userRequestModel);
      }

      const password = await bcrypt.hash(
        userRequestModel.password,
        AppConstants.SALT_OR_ROUNDS
      );

      const userEntity: UserEntity = {
        password: password,
        email: userRequestModel.email
      };

      const res = await this.userService.save(userEntity);

      if (!res.id) {
        userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.registrationResponse(userRequestModel);
      }

      return this.userPresenter.registrationResponse(userRequestModel);

    } catch (e) {
      console.log("error: ", e);
      userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR;
      return this.userPresenter.registrationResponse(userRequestModel);
    }
  }

  async findByEmail(email: string): Promise<UserResponseModel> {
    const user: UserEntity = await this.userService.getUserByEmail(email);
    return this.userPresenter.findResponse(user ? user.email : null);
  }

  async getTokens(userRequestModel: UserRequestModel): Promise<AuthDto> {

    const jwtPayload = {
      sub: userRequestModel.id,
      email: userRequestModel.email
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: this.config.get<string>('AT_SECRET_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.config.get<string>('RT_SECRET_EXPIRES_IN'),
      }),
    ]);

    return  this.authDtoBuilder.withAuthToken(at)
      .withRefreshToken(rt)
      .build();
  }

  async refresh(id: number, email: string): Promise<UserResponseModel> {
    const user = await this.userService.getUserByEmail(email);

    const userRequestModel = this.userRequestModelBuilder.withEmail(user.email)
      .withId(user.id)
      .build();

    const tokens = await this.getTokens(userRequestModel);

    const authDto = this.authDtoBuilder.withAuthToken(tokens.authToken)
      .withRefreshToken(tokens.refreshToken)
      .build();

    return this.userPresenter.buildLoginOrRefreshResponse(authDto);
  }
}
