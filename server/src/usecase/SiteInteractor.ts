import { SiteInteractorBoundary } from "./boundaries/SiteInteractorBoundary";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { SiteEntity } from "../adapter/data/entities/SiteEntity";
import { SiteResponseModel } from "./domain/SiteResponseModel";
import { SiteRequestModel } from "./domain/SiteRequestModel";
import { Inject, Injectable } from "@nestjs/common";
import { SiteService, SS } from "../adapter/data/services/SiteService";
import { SitePresenter, SP } from "./presenters/SitePresenter";
import { IOMsg } from "../common/IOMsg";

@Injectable()
export class SiteInteractor implements SiteInteractorBoundary{

  constructor(
    @Inject(SS)
    private readonly siteService: SiteService,
    @Inject(SP)
    private readonly sitePresenter: SitePresenter
  ) {
  }

  async edit(siteRequestModel: SiteRequestModel): Promise<SiteResponseModel> {
    let response : SiteRequestModel | string;
    try {
      const updateResult = await this.siteService.update(siteRequestModel);
      if (updateResult.affected > 0){
        response = siteRequestModel;
      }else {
        response = IOMsg.ERROR;
      }
    }catch (e) {
      response = e;
    }
    return this.sitePresenter.editResponse(response);
  }

  async getAll(options: IPaginationOptions): Promise<SiteResponseModel> {
    let response : Pagination<SiteEntity> | string;
    try {
      response = await this.siteService.readAll(options);
    }catch (e) {
      response = e.code;
    }
    return this.sitePresenter.buildGetAllResponse(response)
  }

  async getById(id: number): Promise<SiteResponseModel> {
    let response : SiteEntity | string;
    try {
      response = await this.siteService.readById(id);
      if (!response){
        response = IOMsg.USER_NOT_FOUND
      }
    }catch (e) {
      response = e.code;
    }
    return this.sitePresenter.okResponse(response);
  }

  async removeById(id: number): Promise<SiteResponseModel> {
    let isDeleted : boolean;
    try {
      isDeleted = await this.siteService.deleteById(id);
    }catch (e) {
      isDeleted = false;
    }
    return this.sitePresenter.removeResponse(isDeleted);
  }

  async save(siteRequestModel: SiteRequestModel): Promise<SiteResponseModel> {
    let response : SiteEntity | string;
    try {
      response = await this.siteService.create(siteRequestModel);
    }catch (e) {
      response = e.code;
    }
    return this.sitePresenter.okResponse(response);
  }

  async active(id: number): Promise<SiteResponseModel> {
    const isActivated = await this.siteService.activeById(id);
    return this.sitePresenter.activeResponse(isActivated);
  }
}
