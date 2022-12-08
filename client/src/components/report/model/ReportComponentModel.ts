import {SiteDto} from "../../../dtos/SiteDto";
import {KeyValue} from "../../../dtos/KeyValue";
import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";

export const RTCM = "RTCM";
export interface ReportComponentModel {
	experimentId: string;
	startDate: string;
	siteName: string;
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
	onInputChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) : void;
	loadInitData() : boolean;
	validateForm(e: FormEvent<HTMLFormElement>) : boolean;
}
