import { ExperimentInteractorBoundary } from "./boundaries/ExperimentInteractorBoundary";
import { Inject, Injectable } from "@nestjs/common";
import ExperimentRequestModel from "./domain/ExperimentRequestModel";
import ExperimentResponseModel from "./domain/ExperimentResponseModel";
import { EP, ExperimentPresenter } from "./presenters/ExperimentPresenter";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { ABTestReportService, ARS } from "../adapter/report/ABTestReportService";
import OptimizelyDto from "../dto/OptimizelyDto";
import { SiteService, SS } from "../adapter/data/services/SiteService";
import { ToolType } from "../type/ToolType";
import { GoogleSheetService, GSS } from "../adapter/sheet/GoogleSheetService";

@Injectable()
export default class ExperimentInteractor implements ExperimentInteractorBoundary {

  constructor(
    @Inject(EP)
    private readonly experimentPresenter: ExperimentPresenter,
    @Inject(ARS)
    private readonly optimizelyReportService : ABTestReportService<OptimizelyDto>,
    @Inject(SS)
    private readonly siteService: SiteService,
    @Inject(GSS)
    private readonly optimizelySheetService: GoogleSheetService<OptimizelyDto>
  ) {}

  async populateDataToSheet(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    const site = await this.siteService.readById(experimentRequestModel.siteId)

    if (!site){
      experimentRequestModel.msg = IOMsg.NO_SITE;
      experimentRequestModel.code = IOCode.ERROR;
      return await this.experimentPresenter.buildResponse(experimentRequestModel);
    }

    experimentRequestModel.apiKey = site.apiKey;
    experimentRequestModel.toolType = site.toolType;

    if (site.toolType === ToolType.OPTIMIZELY){
      experimentRequestModel.sheetRange = "OptimizelyReport!A:T";
      experimentRequestModel.dtoList = await this.optimizelyReportService
        .getReportData(experimentRequestModel) as OptimizelyDto[];

      if (experimentRequestModel.dtoList.length === 0){
        experimentRequestModel.msg = IOMsg.NO_DATA_API;
        experimentRequestModel.code = IOCode.ERROR;
        return await this.experimentPresenter.buildResponse(experimentRequestModel);
      }

      const isInsertOK = await this.optimizelySheetService.insert(experimentRequestModel);

      if (!isInsertOK){
        experimentRequestModel.msg = IOMsg.ERROR;
        experimentRequestModel.code = IOCode.ERROR;
        return await this.experimentPresenter.buildResponse(experimentRequestModel);
      }

    }else {
      experimentRequestModel.msg = IOMsg.COMING_SOON;
      experimentRequestModel.code = IOCode.ERROR;
      return await this.experimentPresenter.buildResponse(experimentRequestModel);
    }

    return await this.experimentPresenter.buildResponse(experimentRequestModel);
  }
}
