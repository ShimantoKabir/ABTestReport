import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class SiteRequestModel {

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsNumber()
  @IsNotEmpty()
  toolType: number;

  @IsString()
  @IsNotEmpty()
  apiKey: string;

  code: number;
  msg: string;
}
