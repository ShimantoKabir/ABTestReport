import ExperimentRequestModel from "../../usecase/domain/ExperimentRequestModel";
import OptimizelyDto from "../../dto/OptimizelyDto";

export const GSS = "GSS";
export interface GoogleSheetService<T>{
  insert(experimentRequestModel : ExperimentRequestModel) : Promise<boolean>
  getInput() : Promise<OptimizelyDto | null>
}