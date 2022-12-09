import {KeyValue} from "./KeyValue";

export class ReportDto {
	experimentId!: string;
	startDate!: string;
	endDate!: string;
	siteName!: string;
	startDateOffset!: string;
	endDateOffset!: string;
	deviceTypes!: KeyValue<string>[];
	sourceTypes!: KeyValue<string>[];
}
