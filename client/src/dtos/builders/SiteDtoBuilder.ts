import {SiteDto} from "../SiteDto";

export const SDB = "SDB";
export interface SiteDtoBuilder {
	withId(id: number): this;
	withClientName(clientName: string): this;
	withSiteName(siteName: string): this;
	withToolType(toolType: number) : this
	withApiKey(apiKey: string): this;
	withSheetId(sheetId: string): this;
	withIsActive(isActive: boolean): this;
	build() : SiteDto
}
