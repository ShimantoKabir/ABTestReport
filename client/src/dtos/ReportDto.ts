import {SiteDto} from "./SiteDto";
import {KeyValue} from "./KeyValue";

export class ReportDto {
	experimentId!: number;
	startDate!: string;
	endDate!: string;
	sites!: SiteDto[];
	siteName!: string;
	startDateOffset!: number;
	endDateOffset!: number;
	deviceTypes!: KeyValue<string>[];
	sourceTypes!: KeyValue<string>[];
}
