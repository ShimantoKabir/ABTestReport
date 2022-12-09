import { ExperimentInteractorBoundary } from "./boundaries/ExperimentInteractorBoundary";
import { Inject, Injectable } from "@nestjs/common";
import { ExperimentRequestModel } from "./domain/ExperimentRequestModel";
import { ExperimentResponseModel } from "./domain/ExperimentResponseModel";
import { EP, ExperimentPresenter } from "./presenters/ExperimentPresenter";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { ABTestReportService, ARS } from "../adapter/report/ABTestReportService";
import { OD, OptimizelyDto } from "../dto/OptimizelyDto";
import { SiteService, SS } from "../adapter/data/services/SiteService";
import { ToolType } from "../type/ToolType";
import { GoogleSheetService, GSS } from "../adapter/sheet/GoogleSheetService";
import { OptimizelyDtoBuilder } from "../dto/builders/OptimizelyDtoBuilder";

@Injectable()
export default class ExperimentInteractor implements ExperimentInteractorBoundary {

  constructor(
    @Inject(EP)
    private readonly experimentPresenter: ExperimentPresenter,
    @Inject(ARS)
    private readonly optimizelyReportService: ABTestReportService<OptimizelyDto>,
    @Inject(SS)
    private readonly siteService: SiteService,
    @Inject(GSS)
    private readonly optimizelySheetService: GoogleSheetService<OptimizelyDto>,
    @Inject(OD)
    private readonly optimizelyDtoBuilder: OptimizelyDtoBuilder
  ) {
  }

  async getInitData(): Promise<ExperimentResponseModel> {
    const site = await this.siteService.getActiveSite();
    const dto: OptimizelyDto = await this.optimizelySheetService.getInput(site.sheetId);
    return this.experimentPresenter.buildInitResponse(dto);
  }

  async populateDataToSheet(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    const site = await this.siteService.getActiveSite();

    if (!site) {
      experimentRequestModel.msg = IOMsg.NO_SITE;
      experimentRequestModel.code = IOCode.ERROR;
      return await this.experimentPresenter.buildResponse(experimentRequestModel);
    }

    experimentRequestModel.apiKey = site.apiKey;
    experimentRequestModel.toolType = site.toolType;

    experimentRequestModel.sourceTypes.push({
      isChecked: true,
      type: "all",
      value: "",
      key: "ALL"
    });

    await this.optimizelySheetService.clearSheet(site.sheetId);

    const totalReport = experimentRequestModel.deviceTypes.length +
      experimentRequestModel.sourceTypes.length ;

    let totalGeneratedReport = 0

    if (site.toolType === ToolType.OPTIMIZELY) {

      let types = [
        ...experimentRequestModel.deviceTypes,
        ...experimentRequestModel.sourceTypes
      ];

      let offset = 1;
      let limit = 20;

      for (const obj of types) {
        if (obj.isChecked){
          if (obj.type === "all"){
            experimentRequestModel.sourceType = "";
            experimentRequestModel.deviceType = "";
          }else if (obj.type === "device"){
            experimentRequestModel.sourceType = "";
            experimentRequestModel.deviceType = obj.value;
          }else {
            experimentRequestModel.deviceType = "";
            experimentRequestModel.sourceType = obj.value;
          }

          experimentRequestModel.title = obj.key;
          experimentRequestModel.sheetRange = `Api-Report!A${offset}:T${offset+limit}`;

          experimentRequestModel.dtoList = await this.optimizelyReportService
            .getReportData(experimentRequestModel) as OptimizelyDto[];

          if (experimentRequestModel.dtoList.length > 0) {
            await this.optimizelySheetService.insert(experimentRequestModel);
          }

          totalGeneratedReport++;
          offset = offset + limit;
        }
      }

      if (totalReport !== totalGeneratedReport) {
        experimentRequestModel.msg = IOMsg.ERROR;
        experimentRequestModel.code = IOCode.ERROR;
        return await this.experimentPresenter
          .buildResponse(experimentRequestModel);
      }
    } else {
      experimentRequestModel.msg = IOMsg.COMING_SOON;
      experimentRequestModel.code = IOCode.ERROR;
      return await this.experimentPresenter
        .buildResponse(experimentRequestModel);
    }

    return await this.experimentPresenter
      .buildResponse(experimentRequestModel);
  }
}
