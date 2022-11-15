import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { UserRequestModel } from "../domain/UserRequestModel";
import { UserResponseModel } from "../domain/UserResponseModel";

export const AUIB = "AUIB";
export interface AuthorizedUserInteractorBoundary {
  save(userRequestModel : UserRequestModel) : Promise<UserResponseModel>;
  removeById(id: number) : Promise<UserResponseModel>;
  edit(userRequestModel: UserRequestModel) : Promise<UserResponseModel>
  getById(id: number) : Promise<UserResponseModel>;
  getAll(options: IPaginationOptions) : Promise<UserResponseModel>;
}
