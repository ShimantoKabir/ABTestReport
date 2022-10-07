import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap().then(r => console.log(`App running on port ${port}....!`));
