import ExperimentRequestModel from "../../usecase/domain/ExperimentRequestModel";

export const GSS = "GSS";
export interface GoogleSheetService<T>{
  insert(experimentRequestModel : ExperimentRequestModel) : Promise<boolean>
}