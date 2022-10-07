import { Module } from "@nestjs/common";
import {ExperimentController} from "./ExperimentController";
import ExperimentInteractor from "../../../usecase/ExperimentInteractor";
import { EIB } from "../../../usecase/boundaries/ExperimentInteractorBoundary";
import { EP } from "../../../usecase/presenters/ExperimentPresenter";
import ExperimentResponseModel from "../../../usecase/domain/ExperimentResponseModel";

@Module({
  controllers: [ExperimentController],
  providers: [
    {
      provide: EIB,
      useClass: ExperimentInteractor
    },
    {
      provide: EP,
      useClass: ExperimentResponseModel
    }
  ],
})
export class ExperimentModule {}
