import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class SiteRequestModel {

  id?: number;

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

  @IsString()
  @IsNotEmpty()
  sheetId: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  code: number;
  msg: string;
}
