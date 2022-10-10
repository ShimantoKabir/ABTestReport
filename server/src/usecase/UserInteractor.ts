import { UserInteractorBoundary } from "./boundaries/UserInteractorBoundary";
import UserRequestModel from "./domain/UserRequestModel";
import UserResponseModel from "./domain/UserResponseModel";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { Inject, Injectable } from "@nestjs/common";
import { UP, UserPresenter } from "./presenters/UserPresenter";
import UserEntity from "../adapter/data/entities/UserEntity";
import * as bcrypt from "bcrypt";
import AppConstants from "../common/AppConstants";
import { US, UserService } from "../adapter/data/services/UserService";

@Injectable()
export default class UserInteractor implements UserInteractorBoundary {

  constructor(
    @Inject(US)
    private readonly userService: UserService,
    @Inject(UP)
    private readonly userPresenter: UserPresenter
  ) {
  }

  async login(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    userRequestModel.msg = IOMsg.LOGIN_SUCCESS;
    userRequestModel.code = IOCode.OK;

    const user = await this.userService.getUserByUsername(userRequestModel.username);

    if (!user) {
      userRequestModel.msg = IOMsg.LOGIN_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR;
      return this.userPresenter.loginResponse(userRequestModel);
    }

    const isMatch = await bcrypt.compare(userRequestModel.password, user.password);

    if (!isMatch) {
      userRequestModel.msg = IOMsg.LOGIN_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR;
      return this.userPresenter.loginResponse(userRequestModel);
    }

    return this.userPresenter.loginResponse(userRequestModel);
  }

  async register(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    userRequestModel.msg = IOMsg.REGISTRATION_SUCCESS;
    userRequestModel.code = IOCode.OK;

    try {

      const user = await this.userService.getUserByUsername(userRequestModel.username);

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
        username: userRequestModel.username
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

  async findByUsername(username: string): Promise<UserResponseModel> {
    const user: UserEntity = await this.userService.getUserByUsername(username);
    return this.userPresenter.findResponse(user ? user.username : null);
  }
}
