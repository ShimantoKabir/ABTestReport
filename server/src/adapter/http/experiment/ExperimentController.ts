import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { EIB, ExperimentInteractorBoundary } from "../../../usecase/boundaries/ExperimentInteractorBoundary";
import ExperimentResponseModel from "../../../usecase/domain/ExperimentResponseModel";
import ExperimentRequestModel from "../../../usecase/domain/ExperimentRequestModel";
import { Request } from "express";

@Controller("experiment")
export class ExperimentController {

  constructor(
    @Inject(EIB)
    private readonly experimentInteractorBoundary: ExperimentInteractorBoundary
  ) {
  }

  @Post("populate")
  async populate(
    @Body() experimentRequestModel: ExperimentRequestModel,
    @Req() request: Request
  ): Promise<ExperimentResponseModel> {
    console.log(request.url);
    return await this.experimentInteractorBoundary.populateDataToSheet(experimentRequestModel);
  }
}
