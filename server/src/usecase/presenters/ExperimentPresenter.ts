import ExperimentRequestModel from "../domain/ExperimentRequestModel";
import ExperimentResponseModel from "../domain/ExperimentResponseModel";
import OptimizelyDto from "../../dto/OptimizelyDto";
import { Pagination } from "nestjs-typeorm-paginate";
import SiteEntity from "../../adapter/data/entities/SiteEntity";

export interface ExperimentPresenter {
  buildResponse(experimentRequestModel : ExperimentRequestModel) : Promise<ExperimentResponseModel>
  buildInitResponse(input: OptimizelyDto, sites: Pagination<SiteEntity>) : Promise<ExperimentResponseModel>
}
export const EP = 'EP';
