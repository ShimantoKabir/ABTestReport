import { SitePresenter } from "../presenters/SitePresenter";
import { SiteEntity } from "../../adapter/data/entities/SiteEntity";
import { Pagination } from "nestjs-typeorm-paginate";
import { IOCode } from "../../common/IOCode";
import { IOMsg } from "../../common/IOMsg";
import { SiteRequestModel } from "./SiteRequestModel";

export class SiteResponseModel implements SitePresenter {

  code: number;
  msg: string;
  site: SiteEntity;
  sites: Pagination<SiteEntity>;

  buildGetAllResponse(
    pagination: Pagination<SiteEntity> | string
  ) : Promise<SiteResponseModel>
  {
    if (typeof pagination === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.sites = pagination;
    }else {
      this.code = IOCode.ERROR;
      this.msg = pagination;
    }
    return Promise.resolve(this);
  }

  removeResponse(isRemoved: boolean): Promise<SiteResponseModel> {
    if (isRemoved) {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
    } else {
      this.code = IOCode.ERROR;
      this.msg = IOMsg.ERROR;
    }
    return Promise.resolve(this);
  }

  async okResponse(siteEntity: SiteEntity | string): Promise<SiteResponseModel> {
    if (typeof siteEntity === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.site = siteEntity;
    } else {
      this.code = IOCode.ERROR;
      this.msg = siteEntity;
    }
    return Promise.resolve(this);
  }

  editResponse(siteRequestModel: SiteRequestModel | string): Promise<SiteResponseModel> {
    if (typeof siteRequestModel === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.UPDATE_OK;
      this.site = siteRequestModel;
    } else {
      this.code = IOCode.ERROR;
      this.msg = siteRequestModel;
    }
    return Promise.resolve(this);
  }

}
