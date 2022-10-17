import ExperimentRequestModel from "../../usecase/domain/ExperimentRequestModel";
import OptimizelyDto from "../../dto/OptimizelyDto";

export const OS = "OS";
export interface OptimizelyService{
  getResultByNetworkCall(experimentRequestModel: ExperimentRequestModel) : Promise<OptimizelyDto[]>;
  responseToDtoList(data: any): OptimizelyDto[];
  addQueryToUrl(experimentRequestModel: ExperimentRequestModel) : string;
}