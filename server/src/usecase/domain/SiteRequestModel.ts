import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export default class SiteRequestModel {

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  clientName: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  siteName: string | null;

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  toolType: number | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  apiKey: string | null;

  code: number;
  msg: string;
}
