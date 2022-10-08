import SiteRequestModel from "../domain/SiteRequestModel";
import SiteResponseModel from "../domain/SiteResponseModel";
import { Pagination } from "nestjs-typeorm-paginate";
import SiteEntity from "../../adapter/data/entities/SiteEntity";

export const SIB = "SIB";
export interface SiteInteractorBoundary {
  save(siteRequestModel : SiteRequestModel) : Promise<SiteResponseModel>;
  remove(id: number) : Promise<SiteResponseModel>;
  edit(siteRequestModel: SiteRequestModel) : Promise<SiteResponseModel>
  getById(id: number) : Promise<SiteResponseModel>;
  getAll() : Promise<Pagination<SiteEntity>>;
}
