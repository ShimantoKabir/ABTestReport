import {SiteComponentModel} from "./SiteComponentModel";
import {SiteDto} from "../../../dtos/SiteDto";
import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {KeyValue} from "../../../dtos/KeyValue";
import {ToolTypeToArray} from "../../../types/ToolType";
import {ChangeEvent, FormEvent} from "react";
import {SiteService, SS} from "../../../services/domain/SiteService";
import {HS, HttpService} from "../../../services/http/HttpService";
import {AlertDto} from "../../../dtos/AlertDto";
import {MetaDto} from "../../../dtos/MetaDto";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";

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
	meta: MetaDto | null = null;

	@inject(SS)
	private readonly siteService!: SiteService;

	@inject(HS)
	private readonly httpService!: HttpService;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	constructor() {
		makeObservable(this, {
			apiKey: observable,
			clientName: observable,
			isModalOpen: observable,
			isFormValid: observable,
			isActive: observable,
			sheetId: observable,
			siteName: observable,
			meta: observable,
			toolType: observable,
			sites: observable,
			deleteSite: action,
			getSites: action,
			saveSite: action,
			updateSite: action,
			getToolTypes: action,
			onModelToggle: action,
			validateForm: action,
			changSiteStatus: action,
			onInputChange: action
		});
	}

	deleteSite(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	async getSites(page: number, limit: number): Promise<AlertDto> {

		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withStatus(true)
			.withTitle(IOMsg.ERROR_HEAD)
			.withBody(IOMsg.INIT_LOAD_ERROR)
			.build();

		const res = await this.siteService.getAll(page,limit);

		if (res !== null){
			this.sites = res.items;
			this.meta = res.meta;
			alertDto = this.alertDtoBuilder.withCode(IOCode.OK)
			.withStatus(false)
			.withTitle(IOMsg.SUCCESS_HEAD)
			.withBody(IOMsg.INIT_LOAD_MSG)
			.build();
		}

		return Promise.resolve(alertDto);
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

	changSiteStatus(id: number): void {
		this.sites.forEach(obj=>{
			obj.isActive = obj.id === id;
		});
	}
}
