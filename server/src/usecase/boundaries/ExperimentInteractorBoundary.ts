import ExperimentRequestModel from "../domain/ExperimentRequestModel";
import ExperimentResponseModel from "../domain/ExperimentResponseModel";

export const EIB = 'EIB';

export interface ExperimentInteractorBoundary{
  populateDataToSheet(experimentRequestModel : ExperimentRequestModel) : Promise<ExperimentResponseModel>;
}
