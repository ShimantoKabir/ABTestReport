import { Injectable } from "@nestjs/common";
import { UserPresenter } from "../presenters/UserPresenter";
import UserRequestModel from "./UserRequestModel";
import { IOMsg } from "../../common/IOMsg";
import { IOCode } from "../../common/IOCode";

@Injectable()
export default class UserResponseModel implements UserPresenter{

  code: number;
  msg: string;
  username: string;

  async registrationResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    return this;
  }

  async loginResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    this.username = userRequestModel.username;
    return this;
  }

  async findResponse(username?: string): Promise<UserResponseModel> {
    this.msg = IOMsg.USER_NOT_FOUND;
    this.code = IOCode.ERROR;

    if (username){
      this.msg = IOMsg.USER_FOUND;
      this.code = IOCode.OK
      this.username = username;
    }
    return this;
  }
}
