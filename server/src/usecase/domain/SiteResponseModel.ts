import { SitePresenter } from "../presenters/SitePresenter";
import SiteEntity from "../../adapter/data/entities/SiteEntity";
import { Pagination } from "nestjs-typeorm-paginate";
import { IOCode } from "../../common/IOCode";
import { IOMsg } from "../../common/IOMsg";

export default class SiteResponseModel implements SitePresenter{

  code: number;
  msg: string;
  site: SiteEntity;
  sites: Promise<Pagination<SiteEntity>>

  editResponse(isUpdated: boolean, siteEntity: SiteEntity): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  getAllResponse(siteEntities: Pagination<SiteEntity>): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  getByIdResponse(siteEntity: SiteEntity): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  removeResponse(isRemoved: boolean): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  async saveResponse(siteEntity: SiteEntity | string): Promise<SiteResponseModel> {
    if (siteEntity instanceof SiteEntity){
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.site = siteEntity;
    }else {
      this.code = IOCode.ERROR;
      this.msg = siteEntity;
    }
    return Promise.resolve(this);
  }


}
