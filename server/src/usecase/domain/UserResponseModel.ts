import { Injectable } from "@nestjs/common";
import { UserPresenter } from "../presenters/UserPresenter";
import { UserRequestModel } from "./UserRequestModel";
import { IOMsg } from "../../common/IOMsg";
import { IOCode } from "../../common/IOCode";

@Injectable()
export class UserResponseModel implements UserPresenter{

  code: number;
  msg: string;
  email: string;
  jwtToken: string;

  async registrationResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    return this;
  }

  async loginResponse(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    this.msg = userRequestModel.msg;
    this.code = userRequestModel.code;
    this.email = userRequestModel.email;
    return this;
  }

  async findResponse(email?: string): Promise<UserResponseModel> {
    this.msg = IOMsg.USER_NOT_FOUND;
    this.code = IOCode.ERROR;

    if (email){
      this.msg = IOMsg.USER_FOUND;
      this.code = IOCode.OK
      this.email = email;
    }
    return this;
  }

  setJwtToken(jwtToken: string): void {
    this.jwtToken = jwtToken;
  }
}
