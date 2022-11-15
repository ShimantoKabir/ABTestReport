import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { Column } from "typeorm";

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

  @IsString()
  @IsNotEmpty()
  sheetUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  code: number;
  msg: string;
}
