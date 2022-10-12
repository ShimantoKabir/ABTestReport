import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: 'https://ab-production-b225.up.railway.app',
    credentials:true,
  });
  // @ts-ignore
  await app.listen(process.env.PORT | port);
}
bootstrap().then(r => console.log(`App running on port ${port}....!`));
