import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { AuthorizedUserService } from "../AuthorizedUserService";
import { AuthorizedUserEntity } from "../../entities/AuthorizedUserEntity";
import { UserRequestModel } from "../../../../usecase/domain/UserRequestModel";

@Injectable()
export class AuthorizedUserServiceImpl implements AuthorizedUserService {

  constructor(
    @InjectRepository(AuthorizedUserEntity)
    private readonly authorizedUserRepository: Repository<AuthorizedUserEntity>
  ) {
  }

  async create(userRequestModel: UserRequestModel): Promise<AuthorizedUserEntity> {
    return await this.authorizedUserRepository.save(userRequestModel);
  }

  async readAll(options: IPaginationOptions): Promise<Pagination<AuthorizedUserEntity>> {
    const queryBuilder = this.authorizedUserRepository.createQueryBuilder("s");
    queryBuilder.orderBy("s.id", "DESC");
    return await paginate<AuthorizedUserEntity>(queryBuilder, options);
  }

  async readById(id: number): Promise<AuthorizedUserEntity> {
    return await this.authorizedUserRepository.findOneBy({
      id: Equal(id)
    });
  }

  async update(userRequestModel: UserRequestModel): Promise<UpdateResult> {
    return await this.authorizedUserRepository.update(userRequestModel.id, userRequestModel);
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedRes = await this.authorizedUserRepository.delete({
      id: Equal(id)
    });
    return Promise.resolve(deletedRes.affected > 0);
  }

  async readByEmail(email: string): Promise<AuthorizedUserEntity> {
    return await this.authorizedUserRepository.findOneBy({
      email: Equal(email)
    });
  }
}
