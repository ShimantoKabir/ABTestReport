import {ReportDto} from "../ReportDto";
import {SiteDto} from "../SiteDto";

export const RDB = "RDB";
export interface ReportDtoBuilder{
	build() : ReportDto;
	withExperimentId(experimentId: number): this;
	withStartDate(startDate: string): this;
	withEndDate(endDate: string): this;
	withSites(sites: SiteDto[]): this;
	withSiteId(siteId: number): this;
	withStartDateOffset(startDateOffset: number): this;
	withEndDateOffset(endDateOffset: number): this;
}
