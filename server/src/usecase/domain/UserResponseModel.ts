import { Injectable } from "@nestjs/common";
import { UserPresenter } from "../presenters/UserPresenter";
import { UserRequestModel } from "./UserRequestModel";
import { IOMsg } from "../../common/IOMsg";
import { IOCode } from "../../common/IOCode";
import { AuthDto } from "../../dto/AuthDto";
import { AuthorizedUserEntity } from "../../adapter/data/entities/AuthorizedUserEntity";
import { Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class UserResponseModel implements UserPresenter{

  id?: number;
  code: number;
  msg: string;
  email: string;
  authToken: string;
  refreshToken: string
  authorizedUser: AuthorizedUserEntity;
  authorizedUsers: Pagination<AuthorizedUserEntity>;

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

  buildLoginOrRefreshResponse(authDto: AuthDto): Promise<UserResponseModel> {

    this.msg = IOMsg.USER_NOT_FOUND;
    this.code = IOCode.ERROR

    if (authDto.authToken && authDto.refreshToken){
      this.msg = IOMsg.LOGIN_SUCCESS;
      this.code = IOCode.OK;
      this.authToken = authDto.authToken;
      this.refreshToken = authDto.refreshToken;
    }

    return Promise.resolve(this);
  }

  buildAuthorizedUserEditResponse(userRequestModel: UserRequestModel | string): Promise<UserResponseModel> {
    if (typeof userRequestModel === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.UPDATE_OK;
      this.authorizedUser = userRequestModel;
    } else {
      this.code = IOCode.ERROR;
      this.msg = userRequestModel;
    }
    return Promise.resolve(this);
  }

  buildAuthorizedUserOkResponse(authorizedUserEntity: AuthorizedUserEntity | string): Promise<UserResponseModel> {
    if (typeof authorizedUserEntity === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.authorizedUser = authorizedUserEntity;
    } else {
      this.code = IOCode.ERROR;
      this.msg = authorizedUserEntity;
    }
    return Promise.resolve(this);
  }

  buildAuthorizedUserRemoveResponse(isRemoved: boolean): Promise<UserResponseModel> {
    if (isRemoved) {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
    } else {
      this.code = IOCode.ERROR;
      this.msg = IOMsg.ERROR;
    }
    return Promise.resolve(this);
  }

  buildGetAllAuthorizedUserResponse(pagination: Pagination<AuthorizedUserEntity> | string): Promise<UserResponseModel> {
    if (typeof pagination === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.authorizedUsers = pagination;
    }else {
      this.code = IOCode.ERROR;
      this.msg = pagination;
    }
    return Promise.resolve(this);
  }

  buildResetPasswordLinkResponse(result:string): Promise<UserResponseModel> {
    if (result === null){
      this.code = IOCode.OK;
      this.msg = IOMsg.RESET_PASSWORD;
    }else {
      this.code = IOCode.ERROR;
      this.msg = result;
    }
    return Promise.resolve(this);
  }

  buildChangePasswordResponse(result: string): Promise<UserResponseModel> {
    if (result === null){
      this.code = IOCode.OK;
      this.msg = IOMsg.RESET_CHANGED;
    }else {
      this.code = IOCode.ERROR;
      this.msg = result;
    }
    return Promise.resolve(this);
  }
}
