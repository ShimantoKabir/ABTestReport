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
import { ADB } from "../../../dto/builders/AuthDtoBuilder";
import { AuthDtoBuilderImpl } from "../../../dto/builders/implementations/AuthDtoBuilderImpl";
import { URMB } from "../../../usecase/domain/builders/UserRequestModelBuilder";
import {
  UserRequestModelBuilderImpl
} from "../../../usecase/domain/builders/implementations/UserRequestModelBuilderImpl";

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
    {
      provide: ADB,
      useClass: AuthDtoBuilderImpl
    },
    {
      provide: URMB,
      useClass: UserRequestModelBuilderImpl
    },
    AuthTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class UserModule {}
