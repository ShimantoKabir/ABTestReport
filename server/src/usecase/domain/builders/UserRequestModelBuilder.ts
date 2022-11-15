import {UserRequestModel} from "../UserRequestModel";

export const URMB = "URMB";
export interface UserRequestModelBuilder{
  withId(id: number): this;
  withEmail(email: string): this;
  withPassword(password: string): this;
  withCode(code: number): this;
  withMsg(msg: string): this;
  build() : UserRequestModel;
}