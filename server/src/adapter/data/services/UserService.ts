import UserEntity from "../entities/UserEntity";

export const US = "US";
export interface UserService{
  getUserByUsername(username: string) : Promise<UserEntity>
  save(userEntity: UserEntity) : Promise<UserEntity>
}
