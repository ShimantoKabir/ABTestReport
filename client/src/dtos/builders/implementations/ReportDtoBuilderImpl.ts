import {ReportDtoBuilder} from "../ReportDtoBuilder";
import {ReportDto} from "../../ReportDto";
import {SiteDto} from "../../SiteDto";
import {injectable} from "inversify";

@injectable()
export class ReportDtoBuilderImpl implements ReportDtoBuilder{

	reportDto : ReportDto;

	constructor() {
		this.reportDto = new ReportDto();
	}

	withEndDate(endDate: string): this {
		this.reportDto.endDate = endDate;
		return this;
	}

	withEndDateOffset(endDateOffset: number): this {
		this.reportDto.endDateOffset = endDateOffset;
		return this;
	}

	withExperimentId(experimentId: number): this {
		this.reportDto.experimentId = experimentId;
		return this;
	}

	withSiteName(siteName: string): this {
		this.reportDto.siteName = siteName;
		return this;
	}

	withSites(sites: SiteDto[]): this {
		this.reportDto.sites = sites;
		return this;
	}

	withStartDate(startDate: string): this {
		this.reportDto.startDate = startDate;
		return this;
	}

	withStartDateOffset(startDateOffset: number): this {
		this.reportDto.startDateOffset = startDateOffset;
		return this;
	}

	build(): ReportDto {
		return this.reportDto;
	}
}
