import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {ExperimentController} from "./ExperimentController";
import ExperimentInteractor from "../../../usecase/ExperimentInteractor";
import { EIB } from "../../../usecase/boundaries/ExperimentInteractorBoundary";
import { EP } from "../../../usecase/presenters/ExperimentPresenter";
import ExperimentResponseModel from "../../../usecase/domain/ExperimentResponseModel";
import { UserMiddleware } from "../user/UserMiddleware";
import { JwtModule } from "@nestjs/jwt";
import AppConstants from "../../../common/AppConstants";

@Module({
  imports : [
    JwtModule.register({
      secret: AppConstants.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    })
  ],
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
export class ExperimentModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
    .apply(UserMiddleware)
    .forRoutes(ExperimentController);
  }
}
