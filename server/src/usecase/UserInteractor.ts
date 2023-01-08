import { UserInteractorBoundary } from "./boundaries/UserInteractorBoundary";
import { UserRequestModel } from "./domain/UserRequestModel";
import { UserResponseModel } from "./domain/UserResponseModel";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { Inject, Injectable, Logger } from "@nestjs/common";
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
import { AUS, AuthorizedUserService } from "../adapter/data/services/AuthorizedUserService";
import { MailerService } from "@nestjs-modules/mailer";
import { v4 } from "uuid";

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
    @Inject(AUS)
    private readonly authorizedUserService: AuthorizedUserService,
    private jwtService: JwtService,
    private config: ConfigService,
    private mailService: MailerService
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

      const authorizedUser = await this.authorizedUserService.readByEmail(userRequestModel.email);

      if (!authorizedUser){
        userRequestModel.msg = IOMsg.USER_UNAUTHORIZED;
        userRequestModel.code = IOCode.ERROR;
        return this.userPresenter.registrationResponse(userRequestModel);
      }

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

  async generateResetPasswordLink(userRequestModel: UserRequestModel):
    Promise<UserResponseModel>
  {
    let result: string = null;

    try {

      const user: UserEntity = await this.userService
        .getUserByEmail(userRequestModel.email);

      if (!user){
        const result = "This '"
          +userRequestModel.email
          +"' email did not belong to any account!";
        return this.userPresenter.buildResetPasswordLinkResponse(result);
      }

      const token = v4();
      user.token = token;
      user.tokenExp = Date.now();
      const updateRes = await this.userService.update(user);

      const res = await this.mailService.sendMail({
        to: userRequestModel.email,
        from: process.env.SMTP_USER,
        subject: 'Password Reset',
        template: 'password-reset',
        context : {
          resetLink : "http://localhost:3000/users/password/reset?email="+userRequestModel.email+"&token="+token
        }
      });

      if(updateRes.affected > 0 && res.accepted.length > 0){
        return this.userPresenter.buildResetPasswordLinkResponse(result);
      }else {
        return this.userPresenter.buildResetPasswordLinkResponse(IOMsg.ERROR);
      }
    }catch (e) {
      Logger.error("MailError",e);
      return this.userPresenter.buildResetPasswordLinkResponse(IOMsg.ERROR);
    }
  }

  async changeResetPasswordLink(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    if (userRequestModel.password !== userRequestModel.confirmPassword){
      return this.userPresenter.buildChangePasswordResponse(IOMsg.PASSWORD_NOT_MATCHED);
    }

    const user: UserEntity = await this.userService
      .getUserByEmailAndToken(userRequestModel);

    if (!user){
      return this.userPresenter.buildChangePasswordResponse(IOMsg.USER_NOT_FOUND);
    }

    const oldDate = user.tokenExp + (1 * 1 * 15 * 1 * 1)

    console.log("oldDate: ", oldDate);
    console.log("user.tokenExp: ", user.tokenExp);
    console.log("date: ", new Date(oldDate).toLocaleTimeString())

    if (Date.now() < oldDate) {
      return this.userPresenter.buildChangePasswordResponse(IOMsg.PASSWORD_TOKEN_EXPIRED);
    }

    // user.password = await bcrypt.hash(
    //   userRequestModel.password,
    //   AppConstants.SALT_OR_ROUNDS
    // );
    // user.tokenExp = null;
    // user.token = null;
    //
    // const updateRes = await this.userService.update(user);
    //
    // if (updateRes.affected === 0){
    //   return this.userPresenter.buildChangePasswordResponse(IOMsg.PASSWORD_RESET_UNSUCCESSFUL);
    // }

    return this.userPresenter.buildChangePasswordResponse(null);
  }
}
