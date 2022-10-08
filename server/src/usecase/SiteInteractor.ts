import { SiteInteractorBoundary } from "./boundaries/SiteInteractorBoundary";
import { Pagination } from "nestjs-typeorm-paginate";
import SiteEntity from "../adapter/data/entities/SiteEntity";
import SiteResponseModel from "./domain/SiteResponseModel";
import SiteRequestModel from "./domain/SiteRequestModel";
import { Inject, Injectable } from "@nestjs/common";
import { SiteService, SS } from "../adapter/data/services/SiteService";
import { SitePresenter, SP } from "./presenters/SitePresenter";

@Injectable()
export default class SiteInteractor implements SiteInteractorBoundary{

  constructor(
    @Inject(SS)
    private readonly siteService: SiteService,
    @Inject(SP)
    private readonly sitePresenter: SitePresenter
  ) {
  }

  async edit(siteRequestModel: SiteRequestModel): Promise<SiteResponseModel> {
    let response : SiteEntity | string;
    try {
      response = await this.siteService.create(siteRequestModel);
    }catch (e) {
      response = e;
    }
    return this.sitePresenter.saveResponse(response);
  }

  getAll(): Promise<Pagination<SiteEntity>> {
    return Promise.resolve(undefined);
  }

  getById(id: number): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  remove(id: number): Promise<SiteResponseModel> {
    return Promise.resolve(undefined);
  }

  async save(siteRequestModel: SiteRequestModel): Promise<SiteResponseModel> {
    let response : SiteEntity | string;
    try {
      response = await this.siteService.create(siteRequestModel);
    }catch (e) {
      response = e.code;
    }
    return this.sitePresenter.saveResponse(response);
  }

}
