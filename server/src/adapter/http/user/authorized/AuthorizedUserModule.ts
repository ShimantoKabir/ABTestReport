import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthorizedUserEntity } from "../../../data/entities/AuthorizedUserEntity";
import { AuthorizedUserController } from "./AuthorizedUserController";
import { AuthorizedUserInteractor } from "../../../../usecase/AuthorizedUserInteractor";
import { AUIB } from "../../../../usecase/boundaries/AuthorizedUserInteractorBoundary";
import { UP } from "../../../../usecase/presenters/UserPresenter";
import { UserResponseModel } from "../../../../usecase/domain/UserResponseModel";
import { AuthorizedUserServiceImpl } from "../../../data/services/implementations/AuthorizedUserServiceImpl";
import { AUS } from "../../../data/services/AuthorizedUserService";
import { AuthTokenStrategy } from "../../../security/strategies/AuthTokenStrategy";
import { RefreshTokenStrategy } from "../../../security/strategies/RefreshTokenStrategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizedUserEntity]),
    JwtModule.register({}),
    PassportModule
  ],
  controllers: [AuthorizedUserController],
  providers: [
    {
      provide: AUIB,
      useClass: AuthorizedUserInteractor
    },
    {
      provide: UP,
      useClass: UserResponseModel
    },
    {
      provide: AUS,
      useClass: AuthorizedUserServiceImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthorizedUserModule {}
