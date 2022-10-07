import { ExperimentInteractorBoundary } from "./boundaries/ExperimentInteractorBoundary";
import { Inject, Injectable } from "@nestjs/common";
import ExperimentRequestModel from "./domain/ExperimentRequestModel";
import ExperimentResponseModel from "./domain/ExperimentResponseModel";
import { EP, ExperimentPresenter } from "./presenters/ExperimentPresenter";
import { google } from "googleapis";
import AppConstants from "../common/AppConstants";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";

@Injectable()
export default class ExperimentInteractor implements ExperimentInteractorBoundary {

  constructor(
    @Inject(EP)
    private readonly experimentPresenter: ExperimentPresenter
  ) {}

  async populateDataToSheet(experimentRequestModel: ExperimentRequestModel): Promise<ExperimentResponseModel> {

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: AppConstants.GOOGLE_AUTH_SCOPES,
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = AppConstants.SPREAD_SHEET_ID;

    // @ts-ignore
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource : {
        values: [["key", "value"]],
      }
    });

    experimentRequestModel.msg = IOMsg.DATA_POPULATE_SUCCESSFULLY;
    experimentRequestModel.code = IOCode.OK;

    return await this.experimentPresenter.buildResponse(experimentRequestModel);
  }
}
