import {ReportDto} from "../ReportDto";
import {KeyValue} from "../KeyValue";

export const RDB = "RDB";
export interface ReportDtoBuilder{
	build() : ReportDto;
	withExperimentId(experimentId: string): this;
	withStartDate(startDate: string): this;
	withEndDate(endDate: string): this;
	withSiteName(siteName: string): this;
	withStartDateOffset(startDateOffset: string): this;
	withEndDateOffset(endDateOffset: string): this;
	withDeviceTypes(deviceTypes: KeyValue<string>[]): this;
	withSourceTypes(sourceTypes: KeyValue<string>[]): this;
}
