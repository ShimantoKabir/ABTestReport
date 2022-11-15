import { Module } from '@nestjs/common';
import { ExperimentModule } from "./adapter/http/experiment/ExperimentModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./adapter/data/entities/UserEntity";
import { UserModule } from "./adapter/http/user/UserModule";
import { SiteEntity } from "./adapter/data/entities/SiteEntity";
import { SiteModule } from "./adapter/http/site/SiteModule";

@Module({
  imports: [
    ExperimentModule,
    UserModule,
    SiteModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "db.sqlite",
      entities: [UserEntity,SiteEntity],
      synchronize: true
    })
  ]
})
export class AppModule {}
