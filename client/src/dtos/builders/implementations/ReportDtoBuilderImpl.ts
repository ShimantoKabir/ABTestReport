import {ReportDtoBuilder} from "../ReportDtoBuilder";
import {ReportDto} from "../../ReportDto";
import {injectable} from "inversify";
import {KeyValue} from "../../KeyValue";

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

	withEndDateOffset(endDateOffset: string): this {
		this.reportDto.endDateOffset = endDateOffset;
		return this;
	}

	withExperimentId(experimentId: string): this {
		this.reportDto.experimentId = experimentId;
		return this;
	}

	withSiteName(siteName: string): this {
		this.reportDto.siteName = siteName;
		return this;
	}

	withStartDate(startDate: string): this {
		this.reportDto.startDate = startDate;
		return this;
	}

	withStartDateOffset(startDateOffset: string): this {
		this.reportDto.startDateOffset = startDateOffset;
		return this;
	}

	withDeviceTypes(deviceTypes: KeyValue<string>[]): this {
		this.reportDto.deviceTypes = deviceTypes;
		return this;
	}

	withSourceTypes(sourceTypes: KeyValue<string>[]): this {
		this.reportDto.sourceTypes = sourceTypes;
		return this;
	}

	build(): ReportDto {
		return this.reportDto;
	}
}
