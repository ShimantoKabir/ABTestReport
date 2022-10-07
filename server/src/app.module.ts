import { Module } from '@nestjs/common';
import { ExperimentModule } from "./adapter/http/experiment/ExperimentModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./adapter/data/entities/UserEntity";
import { UserModule } from "./adapter/http/user/UserModule";

@Module({
  imports: [
    ExperimentModule,
    UserModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "db.sqlite",
      entities: [UserEntity],
      synchronize: true
    })
  ]
})
export class AppModule {}
