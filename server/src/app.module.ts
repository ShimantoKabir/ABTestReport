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
import { AuthorizedUserModule } from "./adapter/http/user/authorized/AuthorizedUserModule";
import { AuthorizedUserEntity } from "./adapter/data/entities/AuthorizedUserEntity";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from 'path';

@Module({
  imports: [
    ExperimentModule,
    UserModule,
    SiteModule,
    AuthorizedUserModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "db.sqlite",
      entities: [UserEntity,SiteEntity,AuthorizedUserEntity],
      synchronize: true
    }),
    ConfigModule.forRoot({isGlobal: true}),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      }
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ]
})
export class AppModule {}
