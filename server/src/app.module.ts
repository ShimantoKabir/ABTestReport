import { Module } from '@nestjs/common';
import { ExperimentModule } from "./adapter/http/experiment/ExperimentModule";

@Module({
  imports: [ExperimentModule]
})
export class AppModule {}
