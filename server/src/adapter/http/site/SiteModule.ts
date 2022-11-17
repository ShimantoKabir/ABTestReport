import { Module } from "@nestjs/common";
import { SiteController } from "./SiteController";
import { SIB } from "../../../usecase/boundaries/SiteInteractorBoundary";
import { SiteInteractor } from "../../../usecase/SiteInteractor";
import { SP } from "../../../usecase/presenters/SitePresenter";
import { SiteResponseModel } from "../../../usecase/domain/SiteResponseModel";
import { SS } from "../../data/services/SiteService";
import { SiteServiceImpl } from "../../data/services/implementations/SiteServiceImpl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SiteEntity } from "../../data/entities/SiteEntity";
import { JwtModule } from "@nestjs/jwt";
import { AuthTokenStrategy } from "../../security/strategies/AuthTokenStrategy";
import { RefreshTokenStrategy } from "../../security/strategies/RefreshTokenStrategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity]),
    JwtModule.register({}),
    PassportModule
  ],
  controllers: [SiteController],
  providers: [
    {
      provide: SIB,
      useClass: SiteInteractor
    },
    {
      provide: SP,
      useClass: SiteResponseModel
    },
    {
      provide: SS,
      useClass: SiteServiceImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class SiteModule{}
