import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { AuthorizedUserEntity } from "../entities/AuthorizedUserEntity";
import { UserRequestModel } from "../../../usecase/domain/UserRequestModel";

export const AUS = "AUS";
export interface AuthorizedUserService{
  readById(id: number) : Promise<AuthorizedUserEntity>
  readByEmail(email: string) : Promise<AuthorizedUserEntity>
  deleteById(id: number) : Promise<boolean>
  create(userRequestModel: UserRequestModel) : Promise<AuthorizedUserEntity>
  readAll(options: IPaginationOptions): Promise<Pagination<AuthorizedUserEntity>>
  update(userRequestModel: UserRequestModel) : Promise<UpdateResult>
}