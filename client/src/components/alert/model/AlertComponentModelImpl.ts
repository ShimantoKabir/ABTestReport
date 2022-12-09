import {AlertComponentModel} from "./AlertComponentModel";
import {makeObservable, observable, action} from "mobx";
import {injectable} from "inversify";
import {AlertDto} from "../../../dtos/AlertDto";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";

@injectable()
export class AlertComponentModelImpl implements AlertComponentModel{
	title: string = "";
	body: string = "";
	code: number = 0;
	status: boolean = false;
	constructor() {
		makeObservable(this, {
			title: observable,
			body: observable,
			code: observable,
			status: observable,
			changeModalState: action,
			startLoading: action,
			openOrClose: action
		});
	}
	changeModalState(dto: AlertDto): void {
		this.body = dto.body;
		this.code = dto.code;
		this.title = dto.title;
		this.openOrClose(dto.status);
	}
	openOrClose(status: boolean): void {
		this.status  = status;
	}
	startLoading(): void {
		this.body = IOMsg.LOADING_MSG;
		this.code = IOCode.LOADING;
		this.title = IOMsg.LOADING_HEAD;
		this.openOrClose(true);
	}
}
