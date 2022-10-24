import { ExperimentPresenter } from "../presenters/ExperimentPresenter";
import ExperimentRequestModel from "./ExperimentRequestModel";
import { Injectable } from "@nestjs/common";
import OptimizelyDto from "../../dto/OptimizelyDto";
import { Pagination } from "nestjs-typeorm-paginate";
import SiteEntity from "../../adapter/data/entities/SiteEntity";
import { IOCode } from "../../common/IOCode";
import { IOMsg } from "../../common/IOMsg";

@Injectable()
export default class ExperimentResponseModel implements ExperimentPresenter {

  code: number;
  msg: string;
  input: OptimizelyDto;
  sites: Pagination<SiteEntity>;

  async buildResponse(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {
    this.msg = experimentRequestModel.msg;
    this.code = experimentRequestModel.code;
    return this;
  }

  async buildInitResponse(input: OptimizelyDto, sites: Pagination<SiteEntity>) {
    this.input = input;
    this.sites = sites;
    this.code = input === null ? IOCode.ERROR : IOCode.OK;
    this.msg = input === null ? IOMsg.ERROR : IOMsg.OK;
    return this;
  }

}
