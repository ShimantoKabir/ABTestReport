import ExperimentRequestModel from "../../usecase/domain/ExperimentRequestModel";

export const ARS = "ARS";
export interface ABTestReportService<T>{
  getReportData(experimentRequestModel : ExperimentRequestModel) : Promise<T[]>
}
