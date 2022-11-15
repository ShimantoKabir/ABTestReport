import { UserEntity } from "../entities/UserEntity";

export const US = "US";
export interface UserService{
  getUserByEmail(email: string) : Promise<UserEntity>
  save(userEntity: UserEntity) : Promise<UserEntity>
}