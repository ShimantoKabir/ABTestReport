import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { SiteController } from "./SiteController";
import { SIB } from "../../../usecase/boundaries/SiteInteractorBoundary";
import SiteInteractor from "../../../usecase/SiteInteractor";
import { SP } from "../../../usecase/presenters/SitePresenter";
import SiteResponseModel from "../../../usecase/domain/SiteResponseModel";
import { SS } from "../../data/services/SiteService";
import SiteServiceImpl from "../../data/services/implementations/SiteServiceImpl";
import { TypeOrmModule } from "@nestjs/typeorm";
import SiteEntity from "../../data/entities/SiteEntity";
import { JwtModule } from "@nestjs/jwt";
import AppConstants from "../../../common/AppConstants";
import { SiteMiddleware } from "./SiteMiddleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity]),
    JwtModule.register({
      secret: AppConstants.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    })
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
    }
  ],
})
export class SiteModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
    .apply(SiteMiddleware)
    .forRoutes(SiteController);
  }
}
