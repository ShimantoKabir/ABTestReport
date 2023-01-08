import { UserEntity } from "../entities/UserEntity";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";

export const US = "US";
export interface UserService{
  getUserByEmail(email: string) : Promise<UserEntity>
  save(userEntity: UserEntity) : Promise<UserEntity>
  update(userEntity: UserEntity) : Promise<UpdateResult>
  getUserByEmailAndToken(userEntity: UserEntity): Promise<UserEntity>;
}