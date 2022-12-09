import {UserRequestModelBuilder} from "../UserRequestModelBuilder";
import {Injectable} from "@nestjs/common";
import {UserRequestModel} from "../../UserRequestModel";

@Injectable()
export class UserRequestModelBuilderImpl implements UserRequestModelBuilder{

  userRequestModel: UserRequestModel;

  constructor() {
    this.userRequestModel = new UserRequestModel();
  }

  withCode(code: number): this {
    this.userRequestModel.code = code;
    return this;
  }

  withEmail(email: string): this {
    this.userRequestModel.email = email;
    return this;
  }

  withId(id: number): this {
    this.userRequestModel.id = id;
    return this;
  }

  withMsg(msg: string): this {
    this.userRequestModel.msg = msg;
    return this;
  }

  withPassword(password: string): this {
    this.userRequestModel.password = password;
    return this;
  }

  build(): UserRequestModel {
    return this.userRequestModel;
  }
}