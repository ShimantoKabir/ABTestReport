import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { Inject, Injectable } from "@nestjs/common";
import { IOMsg } from "../common/IOMsg";
import { AuthorizedUserInteractorBoundary } from "./boundaries/AuthorizedUserInteractorBoundary";
import { AUS, AuthorizedUserService } from "../adapter/data/services/AuthorizedUserService";
import { UserRequestModel } from "./domain/UserRequestModel";
import { UserResponseModel } from "./domain/UserResponseModel";
import { UP, UserPresenter } from "./presenters/UserPresenter";
import { AuthorizedUserEntity } from "../adapter/data/entities/AuthorizedUserEntity";

@Injectable()
export class AuthorizedUserInteractor implements AuthorizedUserInteractorBoundary{

  constructor(
    @Inject(AUS)
    private readonly authorizedUserService: AuthorizedUserService,
    @Inject(UP)
    private readonly userPresenter: UserPresenter
  ) {
  }

  async edit(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    let response : UserRequestModel | string;
    try {
      const updateResult = await this.authorizedUserService.update(userRequestModel);
      if (updateResult.affected > 0){
        response = userRequestModel;
      }else {
        response = IOMsg.ERROR;
      }
    }catch (e) {
      response = e;
    }
    return this.userPresenter.buildAuthorizedUserEditResponse(response);
  }

  async getAll(options: IPaginationOptions): Promise<UserResponseModel> {
    let response : Pagination<AuthorizedUserEntity> | string;
    try {
      response = await this.authorizedUserService.readAll(options);
    }catch (e) {
      response = e.code;
    }
    return this.userPresenter.buildGetAllAuthorizedUserResponse(response)
  }

  async getById(id: number): Promise<UserResponseModel> {
    let response : AuthorizedUserEntity | string;
    try {
      response = await this.authorizedUserService.readById(id);
      if (!response){
        response = IOMsg.USER_NOT_FOUND
      }
    }catch (e) {
      response = e.code;
    }
    return this.userPresenter.buildAuthorizedUserOkResponse(response);
  }

  async removeById(id: number): Promise<UserResponseModel> {
    let isDeleted : boolean;
    try {
      isDeleted = await this.authorizedUserService.deleteById(id);
    }catch (e) {
      isDeleted = false;
    }
    return this.userPresenter.buildAuthorizedUserRemoveResponse(isDeleted);
  }

  async save(userRequestModel: UserRequestModel): Promise<UserResponseModel> {
    let response : AuthorizedUserEntity | string;
    try {
      response = await this.authorizedUserService.create(userRequestModel);
    }catch (e) {
      response = e.code;
    }
    return this.userPresenter.buildAuthorizedUserOkResponse(response);
  }
}
