import UserResponseModel from "../domain/UserResponseModel";
import UserRequestModel from "../domain/UserRequestModel";

export const UIB = 'UIB';
export interface UserInteractorBoundary{
  register(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  login(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  find(username : string) : Promise<UserResponseModel>;
}
