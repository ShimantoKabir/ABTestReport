import { Injectable } from "@nestjs/common";
import { UserService } from "../UserService";
import { UserEntity } from "../../entities/UserEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserServiceImpl implements UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }
}
