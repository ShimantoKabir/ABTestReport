import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import VwoDto from "../../dto/VwoDto";
import OptimizelyDto from "../../dto/OptimizelyDto";
import AdobeTargetDto from "../../dto/AdobeTargetDto";

export default class ExperimentRequestModel{

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  id: number | null;

  @IsDateString()
  @ValidateIf((object, value) => value)
  startDate?: string;

  @IsDateString()
  @ValidateIf((object, value) => value)
  endDate?: string;

  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  code?: number;
  msg?: string;
  apiKey?: string;
  sheetId?: string;
  sheetRange?: string;
  toolType?: number;
  dtoList?: OptimizelyDto[] | AdobeTargetDto[] | VwoDto[]
}
