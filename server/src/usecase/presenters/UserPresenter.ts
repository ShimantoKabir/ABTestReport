import { UserRequestModel } from "../domain/UserRequestModel";
import { UserResponseModel } from "../domain/UserResponseModel";
import { AuthDto } from "../../dto/AuthDto";
import { AuthorizedUserEntity } from "../../adapter/data/entities/AuthorizedUserEntity";
import { Pagination } from "nestjs-typeorm-paginate";

export interface UserPresenter{
  registrationResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  loginResponse(userRequestModel : UserRequestModel) : Promise<UserResponseModel>
  findResponse(username?: string) : Promise<UserResponseModel>
  buildLoginOrRefreshResponse(authDto: AuthDto): Promise<UserResponseModel>

  buildAuthorizedUserEditResponse(userRequestModel : UserRequestModel | string) : Promise<UserResponseModel>;
  buildAuthorizedUserOkResponse(authorizedUserEntity : AuthorizedUserEntity | string) : Promise<UserResponseModel>;
  buildAuthorizedUserRemoveResponse(isRemoved: boolean) : Promise<UserResponseModel>;
  buildGetAllAuthorizedUserResponse(pagination: Pagination<AuthorizedUserEntity> | string) : Promise<UserResponseModel>;

  buildResetPasswordLinkResponse(result: string): Promise<UserResponseModel>;
  buildChangePasswordResponse(result: string): Promise<UserResponseModel>;
}
export const UP = 'UP';
