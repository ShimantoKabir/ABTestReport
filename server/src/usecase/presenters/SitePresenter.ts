import { SiteEntity } from "../../adapter/data/entities/SiteEntity";
import { SiteResponseModel } from "../domain/SiteResponseModel";
import { Pagination } from "nestjs-typeorm-paginate";
import { SiteRequestModel } from "../domain/SiteRequestModel";

export const SP = "SP";
export interface SitePresenter{
  okResponse(siteEntity : SiteEntity | string) : Promise<SiteResponseModel>;
  removeResponse(isRemoved: boolean) : Promise<SiteResponseModel>;
  activeResponse(isRemoved: boolean) : Promise<SiteResponseModel>;
  editResponse(siteRequestModel : SiteRequestModel | string) : Promise<SiteResponseModel>;
  buildGetAllResponse(pagination: Pagination<SiteEntity> | string) : Promise<SiteResponseModel>;
}
