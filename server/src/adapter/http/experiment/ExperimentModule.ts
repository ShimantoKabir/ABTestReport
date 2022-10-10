import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {ExperimentController} from "./ExperimentController";
import ExperimentInteractor from "../../../usecase/ExperimentInteractor";
import { EIB } from "../../../usecase/boundaries/ExperimentInteractorBoundary";
import { EP } from "../../../usecase/presenters/ExperimentPresenter";
import ExperimentResponseModel from "../../../usecase/domain/ExperimentResponseModel";
import { UserMiddleware } from "../user/UserMiddleware";
import { JwtModule } from "@nestjs/jwt";
import AppConstants from "../../../common/AppConstants";
import { ARS } from "../../report/ABTestReportService";
import ABTestReportServiceImpl from "../../report/implementations/ABTestReportServiceImpl";
import { SS } from "../../data/services/SiteService";
import SiteServiceImpl from "../../data/services/implementations/SiteServiceImpl";
import { OS } from "../../tool/OptimizelyService";
import OptimizelyServiceImpl from "../../tool/implementations/OptimizelyServiceImpl";
import { TypeOrmModule } from "@nestjs/typeorm";
import SiteEntity from "../../data/entities/SiteEntity";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports : [
    TypeOrmModule.forFeature([SiteEntity]),
    JwtModule.register({
      secret: AppConstants.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    }),
    HttpModule
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
    },
    {
      provide: ARS,
      useClass: ABTestReportServiceImpl
    },
    {
      provide: SS,
      useClass: SiteServiceImpl
    },
    {
      provide: OS,
      useClass: OptimizelyServiceImpl
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
