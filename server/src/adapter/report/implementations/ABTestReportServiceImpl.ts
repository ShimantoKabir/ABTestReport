import { ABTestReportService } from "../ABTestReportService";
import ExperimentRequestModel from "../../../usecase/domain/ExperimentRequestModel";
import { Inject, Injectable } from "@nestjs/common";
import { OptimizelyService, OS } from "../../tool/OptimizelyService";
import OptimizelyDto from "../../../dto/OptimizelyDto";
import VwoDto from "../../../dto/VwoDto";
import AdobeTargetDto from "../../../dto/AdobeTargetDto";
import { SiteService, SS } from "../../data/services/SiteService";
import { ToolType } from "../../../type/ToolType";

@Injectable()
export default class ABTestReportServiceImpl<T extends OptimizelyDto | VwoDto | AdobeTargetDto>
  implements ABTestReportService<T> {

  constructor(
    @Inject(OS)
    private readonly optimizelyService: OptimizelyService,
    @Inject(SS)
    private readonly siteService: SiteService
  ) {
  }

  async getReportData(experimentRequestModel: ExperimentRequestModel): Promise<T[]> {

      let report : T[];

      const site = await this.siteService.readById(experimentRequestModel.siteId)

      if (!site){
        return report = [];
      }

      experimentRequestModel.apiKey = site.apiKey;

      if (site.toolType === ToolType.OPTIMIZELY){
        report = await this.optimizelyService.getResultByNetworkCall(experimentRequestModel) as T[];
      }else if (site.toolType === ToolType.VWO) {
        // for vwo
      }else {
        // for adobe target
      }

      return report;
  }
}