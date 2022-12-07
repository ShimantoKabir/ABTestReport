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

@injectable()
export class ReportComponentModelImpl implements ReportComponentModel{

	experimentId: number = 0;
	deviceTypes: KeyValue<string>[] = [];
	endDate: string = "";
	endDateOffset: string = "";
	isFormValid: boolean = false;
	sites: SiteDto[] = [];
	sourceTypes: KeyValue<string>[] = [];
	startDate: string = "";
	startDateOffset: string = "";

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;


	constructor() {
		makeObservable(this, {
			experimentId: observable,
			deviceTypes: observable,
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
		return [];
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
		return [];
	}

	onCheckboxClick(e: ChangeEvent<HTMLInputElement>): void {
		let types = e.target.name === "deviceType" ? this.deviceTypes : this.sourceTypes;
		const newTypes = types.map(obj => {
			if (obj.key === e.target.id) {
				obj.isChecked = !obj.isChecked;
			}
			return obj;
		});
		// this.setState({
		// 	[e.target.name]: newTypes
		// })
	}

}
