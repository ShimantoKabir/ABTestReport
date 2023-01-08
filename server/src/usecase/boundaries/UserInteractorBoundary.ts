import { UserResponseModel } from "../domain/UserResponseModel";
import { UserRequestModel } from "../domain/UserRequestModel";

export const UIB = 'UIB';
export interface UserInteractorBoundary{
  register(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  login(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  findByEmail(email : string) : Promise<UserResponseModel>;
  refresh(id: number, email: string) : Promise<UserResponseModel>
  generateResetPasswordLink(userRequestModel: UserRequestModel): Promise<UserResponseModel>;
  changeResetPasswordLink(userRequestModel: UserRequestModel): Promise<UserResponseModel>;
}
