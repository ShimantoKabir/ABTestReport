import {ReportComponentModel} from "./ReportComponentModel";
import {KeyValue} from "../../../dtos/KeyValue";
import {SiteDto} from "../../../dtos/SiteDto";
import {AlertDto} from "../../../dtos/AlertDto";
import {ChangeEvent, FormEvent} from "react";
import {inject, injectable} from "inversify";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {action, makeObservable, observable} from "mobx";
import {ReportService, RS} from "../../../services/domain/ReportService";
import {RDB, ReportDtoBuilder} from "../../../dtos/builders/ReportDtoBuilder";
import {DeviceTypeToArray} from "../../../types/DeviceType";
import {SourceTypeToArray} from "../../../types/SourceType";

@injectable()
export class ReportComponentModelImpl implements ReportComponentModel{

	experimentId: string = "";
	deviceTypes: KeyValue<string>[] = [];
	endDate: string = "";
	endDateOffset: string = "";
	isFormValid: boolean = false;
	sites: SiteDto[] = [];
	sourceTypes: KeyValue<string>[] = [];
	startDate: string = "";
	startDateOffset: string = "";
	siteName: string = "";

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	@inject(RS)
	private readonly reportService!: ReportService;

	@inject(RDB)
	private readonly reportDtoBuilder!: ReportDtoBuilder;

	constructor() {
		makeObservable(this, {
			experimentId: observable,
			deviceTypes: observable,
			siteName: observable,
			endDate: observable,
			endDateOffset: observable,
			isFormValid: observable,
			sites: observable,
			sourceTypes: observable,
			startDate: observable,
			startDateOffset: observable,
			formatDate: action,
			getDeviceTypes: action,
			getIsoDateTime: action,
			getSourceTypes: action,
			onCheckboxClick: action,
			doSubmitForm: action
		});
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}

	doSubmitForm(e: FormEvent<HTMLFormElement>): Promise<AlertDto> {

		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
		.withStatus(true)
		.withTitle(IOMsg.ERROR_HEAD)
		.withBody(IOMsg.ERROR_BODY)
		.build();

		return Promise.resolve(alertDto);
	}

	formatDate(date: string): string {
		let d = new Date(date);
		return  d.getFullYear()
			+ "-"
			+ (d.getMonth()+1).toString().padStart(2,"0")
			+ "-"
			+ d.getDate().toString().padStart(2,"0");
	}

	getDeviceTypes(): KeyValue<string>[] {
		return this.deviceTypes;
	}

	getIsoDateTime(dateString: string, offset: string): string {
		let dateTimeIso = "";
		if (dateString) {
			const date = new Date(dateString);
			date.setHours(Number(offset));
			const fDate = this.formatDate(date.toLocaleDateString());
			const hours = date.getHours().toString().padStart(2,"0");
			dateTimeIso = `${fDate}T${hours}:00:00.000Z`
		}
		return dateTimeIso;
	}

	getSourceTypes(): KeyValue<string>[] {
		return this.sourceTypes;
	}

	onCheckboxClick(e: ChangeEvent<HTMLInputElement>): void {
		let types = e.target.name === "deviceType" ? this.deviceTypes : this.sourceTypes;
		types.forEach(obj => {
			if (obj.key === e.target.id) {
				obj.isChecked = !obj.isChecked;
			}
			return obj;
		});
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		switch(e.target.id) {
			case "experimentId":
				this.experimentId = e.target.value;
				break;
			case "startDate":
				this.startDate = e.target.value;
				break;
			case "endDate":
				this.endDate = e.target.value;
				break;
			case "sheetId":
				this.sheetId = e.target.value;
				break;
			default:
				this.toolType = Number(e.target.value);
		}
	}

	loadInitData(): boolean {
		this.deviceTypes = DeviceTypeToArray();
		this.sourceTypes = SourceTypeToArray();
		return false;
	}

}
