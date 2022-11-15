import { SiteRequestModel } from "../domain/SiteRequestModel";
import { SiteResponseModel } from "../domain/SiteResponseModel";
import { IPaginationOptions } from "nestjs-typeorm-paginate";

export const SIB = "SIB";
export interface SiteInteractorBoundary {
  save(siteRequestModel : SiteRequestModel) : Promise<SiteResponseModel>;
  removeById(id: number) : Promise<SiteResponseModel>;
  edit(siteRequestModel: SiteRequestModel) : Promise<SiteResponseModel>
  getById(id: number) : Promise<SiteResponseModel>;
  getAll(options: IPaginationOptions) : Promise<SiteResponseModel>;
}
