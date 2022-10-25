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
    private readonly optimizelyReportService: ABTestReportService<OptimizelyDto>,
    @Inject(SS)
    private readonly siteService: SiteService,
    @Inject(GSS)
    private readonly optimizelySheetService: GoogleSheetService<OptimizelyDto>
  ) {
  }

  async getInitData(): Promise<ExperimentResponseModel> {
    const dto: OptimizelyDto = await this.optimizelySheetService.getInput();
    const sites = await this.siteService.readAll({
      limit: 10,
      page: 1
    });

    const site = sites.items.find(obj=>obj.siteName.includes(dto.siteName));
    dto.siteId = site.id;
    return this.experimentPresenter.buildInitResponse(dto,sites);
  }

  async populateDataToSheet(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    const site = await this.siteService.readById(experimentRequestModel.siteId);

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

    const totalReport = experimentRequestModel.deviceTypes.length +
      experimentRequestModel.sourceTypes.length ;

    let totalGeneratedReport = 0

    if (site.toolType === ToolType.OPTIMIZELY) {

      let types = [
        ...experimentRequestModel.deviceTypes,
        ...experimentRequestModel.sourceTypes
      ];

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

          experimentRequestModel.sheetRange = obj.key+"!A:T";
          experimentRequestModel.dtoList = await this.optimizelyReportService
            .getReportData(experimentRequestModel) as OptimizelyDto[];

          if (experimentRequestModel.dtoList.length > 0) {
            const isInsertOK = await this.optimizelySheetService
              .insert(experimentRequestModel);
          }
          totalGeneratedReport++;
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
      return await this.experimentPresenter.buildResponse(experimentRequestModel);
    }

    return await this.experimentPresenter.buildResponse(experimentRequestModel);
  }
}
