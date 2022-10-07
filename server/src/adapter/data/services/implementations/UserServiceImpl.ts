import { Injectable } from "@nestjs/common";
import { UserService } from "../UserService";
import UserEntity from "../../entities/UserEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class UserServiceImpl implements UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        username: username
      }
    });
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }
}
