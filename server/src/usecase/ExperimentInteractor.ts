import { ExperimentInteractorBoundary } from "./boundaries/ExperimentInteractorBoundary";
import { Inject, Injectable } from "@nestjs/common";
import ExperimentRequestModel from "./domain/ExperimentRequestModel";
import ExperimentResponseModel from "./domain/ExperimentResponseModel";
import { EP, ExperimentPresenter } from "./presenters/ExperimentPresenter";
import { google } from "googleapis";
import AppConstants from "../common/AppConstants";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { ABTestReportService, ARS } from "../adapter/report/ABTestReportService";
import OptimizelyDto from "../dto/OptimizelyDto";

@Injectable()
export default class ExperimentInteractor implements ExperimentInteractorBoundary {

  constructor(
    @Inject(EP)
    private readonly experimentPresenter: ExperimentPresenter,
    @Inject(ARS)
    private readonly optimizelyReportService : ABTestReportService<OptimizelyDto>
  ) {}

  async populateDataToSheet(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    const optimizelyDTOs : OptimizelyDto[] = await this.optimizelyReportService.getReportData(experimentRequestModel);

    if (optimizelyDTOs.length === 0){
      experimentRequestModel.msg = IOMsg.ERROR;
      experimentRequestModel.code = IOCode.ERROR;
      return await this.experimentPresenter.buildResponse(experimentRequestModel);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: AppConstants.GOOGLE_AUTH_SCOPES,
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = AppConstants.SPREAD_SHEET_ID;
    
    // @ts-ignore
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "OptimizelyReport!A:T",
      valueInputOption: "USER_ENTERED",
      insertDataOption: 'INSERT_ROWS',
      resource: {
        "majorDimension": "ROWS",
        "values": this.prepareDtoForSheet(optimizelyDTOs)
      }
    });

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    return await this.experimentPresenter.buildResponse(experimentRequestModel);
  }

  prepareDtoForSheet(optimizelyDTOs : OptimizelyDto[]) {
    let parent = [];
    const optimizelyDtoKeys = Object.keys(optimizelyDTOs[0]).map(function (key) {
      return key;
    });
    parent.push(optimizelyDtoKeys);
    optimizelyDTOs.forEach((obj,index)=>{
      let child = [];
      optimizelyDtoKeys.forEach(key=>{
        child.push(obj[key])
      });
      parent.push(child)
    });
    return parent;
  }

}
