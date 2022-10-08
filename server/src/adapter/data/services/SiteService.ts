import SiteEntity from "../entities/SiteEntity";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import SiteRequestModel from "../../../usecase/domain/SiteRequestModel";

export const SS = "SS";
export interface SiteService {
  readById(id: number) : Promise<SiteEntity>
  create(siteRequestModel: SiteRequestModel) : Promise<SiteEntity>
  read(options: IPaginationOptions): Promise<Pagination<SiteEntity>>
  update(siteEntity: SiteEntity) : Promise<UpdateResult>
}
