import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { SIB, SiteInteractorBoundary } from "../../../usecase/boundaries/SiteInteractorBoundary";
import { SiteRequestModel } from "../../../usecase/domain/SiteRequestModel";
import { SiteResponseModel } from "../../../usecase/domain/SiteResponseModel";
import { IPaginationOptions } from "nestjs-typeorm-paginate";

@Controller("sites")
export class SiteController {

  constructor(
    @Inject(SIB)
    private readonly siteInteractorBoundary: SiteInteractorBoundary
  ) {
  }

  @Post()
  async Save(
    @Body() siteRequestModel: SiteRequestModel
  ): Promise<SiteResponseModel> {
    return await this.siteInteractorBoundary.save(siteRequestModel);
  }

  @Put()
  async edit(
    @Body() siteRequestModel: SiteRequestModel
  ): Promise<SiteResponseModel> {
    return await this.siteInteractorBoundary.edit(siteRequestModel);
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<SiteResponseModel> {
    return await this.siteInteractorBoundary.getById(id);
  }

  @Delete(":id")
  async removeById(
    @Param("id") id: number
  ): Promise<SiteResponseModel> {
    return await this.siteInteractorBoundary.removeById(id);
  }

  @Get()
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 5
  ): Promise<SiteResponseModel> {
    const options: IPaginationOptions = {
      limit: limit,
      page: page
    };
    return await this.siteInteractorBoundary.getAll(options);
  }

  @Get("active/:id")
  async active(
    @Param("id") id: number
  ): Promise<SiteResponseModel> {
    return this.siteInteractorBoundary.active(id);
  }
}
