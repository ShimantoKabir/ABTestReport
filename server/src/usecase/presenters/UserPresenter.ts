import { UserRequestModel } from "../domain/UserRequestModel";
import { UserResponseModel } from "../domain/UserResponseModel";

export interface UserPresenter{
  registrationResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  loginResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  findResponse(username?: string) : Promise<UserResponseModel>
  setJwtToken(jwtToken: string) : void;
}
export const UP = 'UP';
