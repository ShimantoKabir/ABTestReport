import ExperimentRequestModel from "../domain/ExperimentRequestModel";
import ExperimentResponseModel from "../domain/ExperimentResponseModel";

export interface ExperimentPresenter {
  buildResponse(experimentRequestModel : ExperimentRequestModel) : Promise<ExperimentResponseModel>
}
export const EP = 'EP';
