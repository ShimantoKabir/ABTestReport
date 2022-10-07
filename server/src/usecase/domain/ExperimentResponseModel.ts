import { ExperimentPresenter } from "../presenters/ExperimentPresenter";
import ExperimentRequestModel from "./ExperimentRequestModel";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class ExperimentResponseModel implements ExperimentPresenter {

  code: number;
  msg: string;

  async buildResponse(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {
    this.msg = experimentRequestModel.msg;
    this.code = experimentRequestModel.code;
    return this;
  }
}
