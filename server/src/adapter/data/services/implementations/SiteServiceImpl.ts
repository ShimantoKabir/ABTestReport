import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { SiteService } from "../SiteService";
import SiteEntity from "../../entities/SiteEntity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import SiteRequestModel from "../../../../usecase/domain/SiteRequestModel";

@Injectable()
export default class SiteServiceImpl implements SiteService {

  constructor(
    @InjectRepository(SiteEntity)
    private readonly siteRepository: Repository<SiteEntity>
  ) {
  }

  async create(siteRequestModel: SiteRequestModel): Promise<SiteEntity> {
    return await this.siteRepository.save(siteRequestModel);
  }

  async read(options: IPaginationOptions): Promise<Pagination<SiteEntity>> {
    const queryBuilder = this.siteRepository.createQueryBuilder('s');
    queryBuilder.orderBy('s.id', 'DESC');
    return await paginate<SiteEntity>(queryBuilder, options);
  }

  async readById(id: number): Promise<SiteEntity> {
    return await this.siteRepository.findOneBy({
      id : Equal(id)
    })
  }

  async update(siteEntity: SiteEntity): Promise<UpdateResult> {
    return await this.siteRepository.update(siteEntity.id, siteEntity);
  }
}
