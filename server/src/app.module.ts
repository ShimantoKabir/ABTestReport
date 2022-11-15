import { Module } from '@nestjs/common';
import { ExperimentModule } from "./adapter/http/experiment/ExperimentModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./adapter/data/entities/UserEntity";
import { UserModule } from "./adapter/http/user/UserModule";
import { SiteEntity } from "./adapter/data/entities/SiteEntity";
import { SiteModule } from "./adapter/http/site/SiteModule";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthTokenGuard } from "./adapter/security/guards/AuthTokenGuard";

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
    }),
    ConfigModule.forRoot({isGlobal: true})
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ]
})
export class AppModule {}
