import {SiteComponentModel} from "./SiteComponentModel";
import {SiteDto} from "../../../dtos/SiteDto";
import {injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {KeyValue} from "../../../dtos/KeyValue";
import {ToolTypeToArray} from "../../../types/ToolType";
import {ChangeEvent, FormEvent} from "react";

@injectable()
export class SiteComponentModelImpl  implements SiteComponentModel{

	apiKey: string = "";
	clientName: string = "";
	isActive: boolean = false;
	sheetId: string = "";
	siteName: string = "";
	toolType: number = 0;
	isModalOpen: boolean = false;
	isFormValid: boolean = false;
	sites: SiteDto[] = [];

	constructor() {
		makeObservable(this, {
			apiKey: observable,
			clientName: observable,
			isModalOpen: observable,
			isFormValid: observable,
			isActive: observable,
			sheetId: observable,
			siteName: observable,
			toolType: observable,
			sites: observable,
			deleteSite: action,
			getSites: action,
			saveSite: action,
			updateSite: action,
			getToolTypes: action,
			onModelToggle: action,
			onInputChange: action
		});
	}

	deleteSite(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	getSites(page: number, limit: number): Promise<SiteDto[]> {
		return Promise.resolve([]);
	}

	async saveSite(e: FormEvent<HTMLFormElement>): Promise<void> {

	}

	async updateSite(siteDto: SiteDto): Promise<void> {

	}

	getToolTypes(): KeyValue[] {
		return ToolTypeToArray();
	}

	onModelToggle = (status: boolean) => {
		this.isModalOpen = status;
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}

	onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>): void {
		switch(e.target.id) {
			case "clientName":
				this.clientName = e.target.value;
				break;
			case "siteName":
				this.siteName = e.target.value;
				break;
			case "apiKey":
				this.apiKey = e.target.value;
				break;
			case "sheetId":
				this.sheetId = e.target.value;
				break;
			default:
				this.toolType = Number(e.target.value);
		}
	}


}
