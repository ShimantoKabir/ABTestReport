import { Module } from "@nestjs/common";
import { SiteController } from "./SiteController";
import { SIB } from "../../../usecase/boundaries/SiteInteractorBoundary";
import SiteInteractor from "../../../usecase/SiteInteractor";
import { SP } from "../../../usecase/presenters/SitePresenter";
import SiteResponseModel from "../../../usecase/domain/SiteResponseModel";
import { SS } from "../../data/services/SiteService";
import SiteServiceImpl from "../../data/services/implementations/SiteServiceImpl";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../data/entities/UserEntity";
import SiteEntity from "../../data/entities/SiteEntity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity])
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
export class SiteModule{}
