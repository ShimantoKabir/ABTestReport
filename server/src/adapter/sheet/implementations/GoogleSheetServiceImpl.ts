import { GoogleSheetService, GSS } from "../GoogleSheetService";
import OptimizelyDto, { OD } from "../../../dto/OptimizelyDto";
import VwoDto from "../../../dto/VwoDto";
import AdobeTargetDto from "../../../dto/AdobeTargetDto";
import ExperimentRequestModel from "../../../usecase/domain/ExperimentRequestModel";
import { Inject, Injectable } from "@nestjs/common";
import { google } from "googleapis";
import AppConstants from "../../../common/AppConstants";
import { OptimizelyDtoBuilder } from "../../../dto/builders/OptimizelyDtoBuilder";

@Injectable()
export class GoogleSheetServiceImpl<T extends OptimizelyDto | VwoDto | AdobeTargetDto> implements GoogleSheetService<T> {

  constructor(
    @Inject(OD)
    private readonly optimizelyDtoBuilder: OptimizelyDtoBuilder,
  ) {
  }

  async insert(experimentRequestModel: ExperimentRequestModel): Promise<boolean>
  {

    let isInsertOk: boolean;

    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: AppConstants.GOOGLE_AUTH_SCOPES
      });

      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = AppConstants.SPREAD_SHEET_ID;

      await googleSheets.spreadsheets.values.clear({
        spreadsheetId: spreadsheetId,
        range: experimentRequestModel.sheetRange,
        auth: auth
      });

      // @ts-ignore
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: experimentRequestModel.sheetRange,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: {
          "majorDimension": "ROWS",
          "values": this.prepareDtoForSheet<OptimizelyDto>(
            experimentRequestModel.dtoList as OptimizelyDto[]
          )
        }
      });
      isInsertOk = true;
    } catch (e) {
      console.log("err", e);
      isInsertOk = false;
    }

    return Promise.resolve(isInsertOk);
  }

  prepareDtoForSheet<T>(dtoList: T[]) {
    let parent = [];
    const optimizelyDtoKeys = Object.keys(dtoList[0]).map(function(key) {
      return key;
    });
    parent.push(optimizelyDtoKeys);
    dtoList.forEach((obj, index) => {
      let child = [];
      optimizelyDtoKeys.forEach(key => {
        child.push(obj[key]);
      });
      parent.push(child);
    });
    return parent;
  }

  async getInput(): Promise<OptimizelyDto> {

    try {

      const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: AppConstants.GOOGLE_AUTH_SCOPES
      });

      const client = await auth.getClient();
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = AppConstants.SPREAD_SHEET_ID;

      const result = await googleSheets.spreadsheets.values.batchGet({
        spreadsheetId: spreadsheetId,
        ranges: ["A1:B6"],
        auth: auth
      });

      let data = result.data.valueRanges.values().next().value.values

      this.optimizelyDtoBuilder.withExperimentId(data[0][1]);
      this.optimizelyDtoBuilder.withStartDate(data[1][1])
      this.optimizelyDtoBuilder.withEndDate(data[2][1])
      this.optimizelyDtoBuilder.withSiteName(data[5][1])
      return Promise.resolve(this.optimizelyDtoBuilder.build());
    }catch (e){
      console.log("error=",e);
      return Promise.resolve(null);
    }
  }
}