import { IsNumber, IsString, ValidateIf } from "class-validator";

export default class SiteRequestModel {

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsString()
  clientName: string;

  @IsString()
  siteName: string;

  @IsNumber()
  toolType: number;

  @IsString()
  apiKey: string;

  code: number;
  msg: string;
}
