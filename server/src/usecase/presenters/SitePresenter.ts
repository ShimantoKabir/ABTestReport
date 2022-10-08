import SiteEntity from "../../adapter/data/entities/SiteEntity";
import SiteResponseModel from "../domain/SiteResponseModel";
import { Pagination } from "nestjs-typeorm-paginate";

export const SP = "SP";
export interface SitePresenter{
  saveResponse(siteEntity : SiteEntity | string) : Promise<SiteResponseModel>;
  removeResponse(isRemoved: boolean) : Promise<SiteResponseModel>;
  editResponse(isUpdated: boolean, siteEntity: SiteEntity) : Promise<SiteResponseModel>;
  getByIdResponse(siteEntity : SiteEntity) : Promise<SiteResponseModel>;
  getAllResponse(siteEntities: Pagination<SiteEntity>) : Promise<SiteResponseModel>;
}
