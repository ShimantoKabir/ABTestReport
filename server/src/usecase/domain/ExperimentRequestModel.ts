import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export default class ExperimentRequestModel{

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  code?: number;
  msg?: string;
  apiKey?: string;
}
