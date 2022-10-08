import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { SIB, SiteInteractorBoundary } from "../../../usecase/boundaries/SiteInteractorBoundary";
import { Request } from "express";
import SiteRequestModel from "../../../usecase/domain/SiteRequestModel";
import SiteResponseModel from "../../../usecase/domain/SiteResponseModel";

@Controller("sites")
export class SiteController{

  constructor(
    @Inject(SIB)
    private readonly siteInteractorBoundary: SiteInteractorBoundary
  ) {
  }

  @Post()
  async Save(
    @Body() siteRequestModel: SiteRequestModel,
    @Req() request: Request
  ): Promise<SiteResponseModel> {
    return await this.siteInteractorBoundary.save(siteRequestModel);
  }

}
