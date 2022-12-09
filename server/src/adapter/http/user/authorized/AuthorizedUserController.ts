import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import {
  AUIB,
  AuthorizedUserInteractorBoundary
} from "../../../../usecase/boundaries/AuthorizedUserInteractorBoundary";
import { UserRequestModel } from "../../../../usecase/domain/UserRequestModel";
import { UserResponseModel } from "../../../../usecase/domain/UserResponseModel";

@Controller("authorized/users")
export class AuthorizedUserController {

  constructor(
    @Inject(AUIB)
    private readonly authorizedUserInteractorBoundary: AuthorizedUserInteractorBoundary
  ) {
  }

  @Post()
  async Save(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.authorizedUserInteractorBoundary.save(userRequestModel);
  }

  @Put()
  async edit(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.authorizedUserInteractorBoundary.edit(userRequestModel);
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<UserResponseModel> {
    return await this.authorizedUserInteractorBoundary.getById(id);
  }

  @Delete(":id")
  async removeById(
    @Param("id") id: number
  ): Promise<UserResponseModel> {
    return await this.authorizedUserInteractorBoundary.removeById(id);
  }

  @Get()
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 5
  ): Promise<UserResponseModel> {
    const options: IPaginationOptions = {
      limit: limit,
      page: page
    };
    return await this.authorizedUserInteractorBoundary.getAll(options);
  }

}
