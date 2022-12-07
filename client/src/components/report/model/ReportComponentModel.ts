import {SiteDto} from "../../../dtos/SiteDto";
import {KeyValue} from "../../../dtos/KeyValue";
import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";

export const RCM = "RCM";
export interface ReportComponentModel {
	experimentId: number;
	startDate: string;
	endDate: string;
	startDateOffset: string;
	endDateOffset: string;
	isFormValid: boolean;
	sites: SiteDto[],
	deviceTypes: KeyValue<string>[];
	sourceTypes: KeyValue<string>[];
	getIsoDateTime(dateString: string, offset: string): string;
	getDeviceTypes() : KeyValue<string>[];
	getSourceTypes() : KeyValue<string>[];
	onCheckboxClick(e: ChangeEvent<HTMLInputElement>) : void;
	formatDate(date: string): string;
	doSubmitForm(e: FormEvent<HTMLFormElement>) : Promise<AlertDto>;
}
