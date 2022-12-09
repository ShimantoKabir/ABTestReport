import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {ExperimentController} from "./ExperimentController";
import ExperimentInteractor from "../../../usecase/ExperimentInteractor";
import { EIB } from "../../../usecase/boundaries/ExperimentInteractorBoundary";
import { EP } from "../../../usecase/presenters/ExperimentPresenter";
import { ExperimentResponseModel } from "../../../usecase/domain/ExperimentResponseModel";
import { JwtModule } from "@nestjs/jwt";
import { ARS } from "../../report/ABTestReportService";
import { ABTestReportServiceImpl } from "../../report/implementations/ABTestReportServiceImpl";
import { SS } from "../../data/services/SiteService";
import { SiteServiceImpl } from "../../data/services/implementations/SiteServiceImpl";
import { OS } from "../../tool/OptimizelyService";
import { OptimizelyServiceImpl } from "../../tool/implementations/OptimizelyServiceImpl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SiteEntity } from "../../data/entities/SiteEntity";
import { HttpModule } from "@nestjs/axios";
import { GSS } from "../../sheet/GoogleSheetService";
import { GoogleSheetServiceImpl } from "../../sheet/implementations/GoogleSheetServiceImpl";
import { OD } from "../../../dto/OptimizelyDto";
import {
  OptimizelyDtoBuilderImpl
} from "../../../dto/builders/implementations/OptimizelyDtoBuilderImpl";
import { PassportModule } from "@nestjs/passport";
import { AuthTokenStrategy } from "../../security/strategies/AuthTokenStrategy";
import { RefreshTokenStrategy } from "../../security/strategies/RefreshTokenStrategy";

@Module({
  imports : [
    TypeOrmModule.forFeature([SiteEntity]),
    JwtModule.register({}),
    HttpModule,
    PassportModule
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
    },
    {
      provide: GSS,
      useClass: GoogleSheetServiceImpl
    },
    {
      provide: OD,
      useClass: OptimizelyDtoBuilderImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class ExperimentModule {}
