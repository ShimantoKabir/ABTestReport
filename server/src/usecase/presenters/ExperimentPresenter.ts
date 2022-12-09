import { ExperimentRequestModel } from "../domain/ExperimentRequestModel";
import { ExperimentResponseModel } from "../domain/ExperimentResponseModel";
import { OptimizelyDto } from "../../dto/OptimizelyDto";
import { Pagination } from "nestjs-typeorm-paginate";
import { SiteEntity } from "../../adapter/data/entities/SiteEntity";

export interface ExperimentPresenter {
  buildResponse(experimentRequestModel : ExperimentRequestModel) : Promise<ExperimentResponseModel>
  buildInitResponse(input: OptimizelyDto) : Promise<ExperimentResponseModel>
}
export const EP = 'EP';
