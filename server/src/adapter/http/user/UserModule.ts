import { Module } from "@nestjs/common";
import { UserController } from "./UserController";
import { UserInteractor } from "../../../usecase/UserInteractor";
import { UIB } from "../../../usecase/boundaries/UserInteractorBoundary";
import { UserResponseModel } from "../../../usecase/domain/UserResponseModel";
import { UP } from "../../../usecase/presenters/UserPresenter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../data/entities/UserEntity";
import { JwtModule } from "@nestjs/jwt";
import { US } from "../../data/services/UserService";
import { UserServiceImpl } from "../../data/services/implementations/UserServiceImpl";
import { PassportModule } from "@nestjs/passport";
import { AuthTokenStrategy } from "../../security/strategies/AuthTokenStrategy";
import { RefreshTokenStrategy } from "../../security/strategies/RefreshTokenStrategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
    PassportModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UIB,
      useClass: UserInteractor
    },
    {
      provide: UP,
      useClass: UserResponseModel
    },
    {
      provide: US,
      useClass: UserServiceImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class UserModule {
}
