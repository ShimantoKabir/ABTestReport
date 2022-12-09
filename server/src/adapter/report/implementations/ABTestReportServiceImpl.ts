import { ABTestReportService } from "../ABTestReportService";
import { ExperimentRequestModel } from "../../../usecase/domain/ExperimentRequestModel";
import { Inject, Injectable } from "@nestjs/common";
import { OptimizelyService, OS } from "../../tool/OptimizelyService";
import { OptimizelyDto } from "../../../dto/OptimizelyDto";
import { VwoDto } from "../../../dto/VwoDto";
import { AdobeTargetDto } from "../../../dto/AdobeTargetDto";
import { ToolType } from "../../../type/ToolType";

@Injectable()
export class ABTestReportServiceImpl<T extends OptimizelyDto | VwoDto | AdobeTargetDto>
  implements ABTestReportService<T> {

  constructor(
    @Inject(OS)
    private readonly optimizelyService: OptimizelyService
  ) {
  }

  async getReportData(experimentRequestModel: ExperimentRequestModel): Promise<T[]> {

      let report : T[];

      if (experimentRequestModel.toolType === ToolType.OPTIMIZELY){
        report = await this.optimizelyService.getResultByNetworkCall(experimentRequestModel) as T[];
      }else if (experimentRequestModel.toolType === ToolType.VWO) {
        // for vwo
        report = [];
      }else {
        // for adobe target
        report = [];
      }

      return report;
  }
}