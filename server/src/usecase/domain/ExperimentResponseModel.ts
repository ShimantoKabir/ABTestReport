import { ExperimentPresenter } from "../presenters/ExperimentPresenter";
import { ExperimentRequestModel } from "./ExperimentRequestModel";
import { Injectable } from "@nestjs/common";
import { OptimizelyDto } from "../../dto/OptimizelyDto";
import { IOCode } from "../../common/IOCode";
import { IOMsg } from "../../common/IOMsg";

@Injectable()
export class ExperimentResponseModel implements ExperimentPresenter {

  code: number;
  msg: string;
  input: OptimizelyDto;

  async buildResponse(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {
    this.msg = experimentRequestModel.msg;
    this.code = experimentRequestModel.code;
    return this;
  }

  async buildInitResponse(input: OptimizelyDto) {
    this.input = input;
    this.code = input === null ? IOCode.ERROR : IOCode.OK;
    this.msg = input === null ? IOMsg.ERROR : IOMsg.OK;
    return this;
  }

}
