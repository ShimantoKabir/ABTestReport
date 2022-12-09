import {SiteDtoBuilder} from "../SiteDtoBuilder";
import {SiteDto} from "../../SiteDto";
import {injectable} from "inversify";

@injectable()
export class SiteDtoBuilderImpl implements SiteDtoBuilder{

	siteDto: SiteDto;

	constructor() {
		this.siteDto = new SiteDto();
	}

	withApiKey(apiKey: string): this {
		this.siteDto.apiKey = apiKey;
		return this;
	}

	withClientName(clientName: string): this {
		this.siteDto.clientName = clientName;
		return this;
	}

	withId(id: number): this {
		this.siteDto.id = id;
		return this;
	}

	withIsActive(isActive: boolean): this {
		this.siteDto.isActive = isActive;
		return this;
	}

	withSheetId(sheetId: string): this {
		this.siteDto.sheetId = sheetId;
		return this;
	}

	withSiteName(siteName: string): this {
		this.siteDto.siteName = siteName;
		return this;
	}

	withToolType(toolType: number): this {
		this.siteDto.toolType = toolType;
		return this;
	}

	build(): SiteDto {
		return this.siteDto;
	}
}
