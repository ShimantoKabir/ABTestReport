import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { VwoDto } from "../../dto/VwoDto";
import { OptimizelyDto } from "../../dto/OptimizelyDto";
import { AdobeTargetDto } from "../../dto/AdobeTargetDto";
import { Checkbox } from "../../dto/Checkbox";

export class ExperimentRequestModel{

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsDateString()
  @ValidateIf((object, value) => value)
  startDate?: string;

  @IsDateString()
  @ValidateIf((object, value) => value)
  endDate?: string;

  @IsArray()
  @IsNotEmpty()
  deviceTypes: Checkbox[];

  @IsArray()
  @IsNotEmpty()
  sourceTypes: Checkbox[];

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  code?: number;
  msg?: string;
  apiKey?: string;
  sheetId?: string;
  sheetRange?: string;
  toolType?: number;
  deviceType?: string;
  sourceType?: string;
  dtoList?: OptimizelyDto[] | AdobeTargetDto[] | VwoDto[]
}
