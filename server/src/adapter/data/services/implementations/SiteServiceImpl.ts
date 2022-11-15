import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { SiteService } from "../SiteService";
import { SiteEntity } from "../../entities/SiteEntity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { SiteRequestModel } from "../../../../usecase/domain/SiteRequestModel";

@Injectable()
export class SiteServiceImpl implements SiteService {

  constructor(
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>
  ) {
  }

  async create(siteRequestModel: SiteRequestModel): Promise<SiteEntity> {
    return await this.siteRepository.save(siteRequestModel);
  }

  async readAll(options: IPaginationOptions): Promise<Pagination<SiteEntity>> {
    const queryBuilder = this.siteRepository.createQueryBuilder("s");
    queryBuilder.orderBy("s.id", "DESC");
    return await paginate<SiteEntity>(queryBuilder, options);
  }

  async readById(id: number): Promise<SiteEntity> {
    return await this.siteRepository.findOneBy({
      id: Equal(id)
    });
  }

  async update(siteRequestModel: SiteRequestModel): Promise<UpdateResult> {
    return await this.siteRepository.update(siteRequestModel.id, siteRequestModel);
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedRes = await this.siteRepository.delete({
      id: Equal(id)
    });
    return Promise.resolve(deletedRes.affected > 0);
  }
}
