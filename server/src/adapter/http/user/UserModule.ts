import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./UserController";
import UserInteractor from "../../../usecase/UserInteractor";
import { UIB } from "../../../usecase/boundaries/UserInteractorBoundary";
import UserResponseModel from "../../../usecase/domain/UserResponseModel";
import { UP } from "../../../usecase/presenters/UserPresenter";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../data/entities/UserEntity";
import { JwtModule } from "@nestjs/jwt";
import AppConstants from "../../../common/AppConstants";
import { UserMiddleware } from "./UserMiddleware";
import { US } from "../../data/services/UserService";
import UserServiceImpl from "../../data/services/implementations/UserServiceImpl";

@Module({
  imports : [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: AppConstants.JWT_SECRET_KEY,
      signOptions: {expiresIn: '1d'}
    })
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
    }
  ],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
    .apply(UserMiddleware)
    .exclude(
      { path: 'user/register', method: RequestMethod.POST },
      { path: 'user/login', method: RequestMethod.POST },
      { path: 'user/logout', method: RequestMethod.POST }
    )
    .forRoutes(UserController);
  }
}
