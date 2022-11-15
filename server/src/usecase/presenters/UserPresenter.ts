import { UserRequestModel } from "../domain/UserRequestModel";
import { UserResponseModel } from "../domain/UserResponseModel";
import { AuthDto } from "../../dto/AuthDto";

export interface UserPresenter{
  registrationResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  loginResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  findResponse(username?: string) : Promise<UserResponseModel>
  buildLoginOrRefreshResponse(authDto: AuthDto): Promise<UserResponseModel>
}
export const UP = 'UP';
