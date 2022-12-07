import {SiteDto} from "./SiteDto";

export class ReportDto {
	experimentId!: number;
	startDate!: string;
	endDate!: string;
	sites!: SiteDto[];
	siteId!: number;
	startDateOffset!: number;
	endDateOffset!: number;
}
