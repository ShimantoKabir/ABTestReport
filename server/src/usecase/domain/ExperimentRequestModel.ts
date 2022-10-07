import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export default class ExperimentRequestModel{

  @IsNumber()
  id: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  deviceType: number;

  code: number;
  msg: string;
}
