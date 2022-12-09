import {SiteComponentModel} from "./SiteComponentModel";
import {SiteDto} from "../../../dtos/SiteDto";
import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {KeyValue} from "../../../dtos/KeyValue";
import {ToolTypeToArray} from "../../../types/ToolType";
import {ChangeEvent, FormEvent} from "react";
import {SiteService, SS} from "../../../services/domain/SiteService";
import {AlertDto} from "../../../dtos/AlertDto";
import {MetaDto} from "../../../dtos/MetaDto";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {SDB, SiteDtoBuilder} from "../../../dtos/builders/SiteDtoBuilder";

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
	id: number = 0;

	@inject(SS)
	private readonly siteService!: SiteService;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	@inject(SDB)
	private readonly siteDtoBuilder!: SiteDtoBuilder;

	constructor() {
		makeObservable(this, {
			id: observable,
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
			getToolTypes: action,
			onModelToggle: action,
			validateForm: action,
			changSiteStatus: action,
			onInputChange: action,
			setModelData: action,
			emptyModelData: action,
			doSubmitForm: action,
			fetchSites: action,
			getSites: action
		});
	}

	async deleteSite(id: number): Promise<AlertDto> {
		const isDeleted =  await this.siteService.delete(id);
		let alertDto: AlertDto|null = null;

		if (!isDeleted){
			alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withStatus(true)
			.withTitle(IOMsg.ERROR_HEAD)
			.withBody(IOMsg.ERROR_BODY)
			.build();
			return Promise.resolve(alertDto);
		}

		this.sites = this.sites.filter(obj=>obj.id !== id);

		alertDto = this.alertDtoBuilder.withCode(IOCode.OK)
		.withStatus(false)
		.withTitle(IOMsg.SUCCESS_HEAD)
		.withBody(IOMsg.OK)
		.build();

		return Promise.resolve(alertDto);
	}

	async fetchSites(page: number, limit: number): Promise<AlertDto> {

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

	getToolTypes(): KeyValue<number>[] {
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

	onInputChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>): void {
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

	async changSiteStatus(id: number): Promise<AlertDto> {

		const isActivated = await this.siteService.active(id);
		let alertDto = null;

		if (isActivated){

			this.sites.forEach(obj=>{
				obj.isActive = obj.id === id;
			});

			alertDto = this.alertDtoBuilder.withCode(IOCode.OK)
			.withStatus(false)
			.withTitle(IOMsg.SUCCESS_HEAD)
			.withBody(IOMsg.SITE_ACTIVE)
			.build();
		}else {
			alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withStatus(true)
			.withTitle(IOMsg.ERROR_HEAD)
			.withBody(IOMsg.ERROR_BODY)
			.build();
		}

		return Promise.resolve(alertDto)
	}

	setModelData(siteDto: SiteDto): Promise<boolean> {
		this.id = siteDto.id;
		this.clientName = siteDto.clientName;
		this.siteName = siteDto.siteName;
		this.apiKey = siteDto.apiKey;
		this.sheetId = siteDto.sheetId;
		this.toolType = siteDto.toolType;
		this.isActive = siteDto.isActive;
		return Promise.resolve(false);
	}

	emptyModelData(): boolean {
		this.id = 0;
		this.clientName = "";
		this.siteName = "";
		this.apiKey = "";
		this.sheetId = "";
		this.toolType = 0;
		return true;
	}

	async doSubmitForm(e: FormEvent<HTMLFormElement>): Promise<AlertDto> {
		const isValid = this.validateForm(e)
		let alertDto: AlertDto | null = null;

		if (!isValid){
			alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withStatus(true)
			.withTitle(IOMsg.ERROR_HEAD)
			.withBody(IOMsg.VALIDATION_ERROR)
			.build();
			return Promise.resolve(alertDto);
		}

		let siteDto: SiteDto = this.siteDtoBuilder.withSiteName(this.siteName)
			.withClientName(this.clientName)
			.withApiKey(this.apiKey)
			.withSheetId(this.sheetId)
			.withIsActive(this.isActive)
			.withId(this.id)
			.withToolType(this.toolType)
			.build();

		const siteDtoRes: SiteDto|null = this.id === 0 ? await this.siteService.save(siteDto)
			: await this.siteService.edit(siteDto);

		if (siteDtoRes === null){
			alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withStatus(true)
			.withTitle(IOMsg.ERROR_HEAD)
			.withBody(IOMsg.ERROR_BODY)
			.build();
			return Promise.resolve(alertDto);
		}

		if (this.id === 0){
			this.sites.push(siteDtoRes);
		}else {
			const index = this.sites.findIndex(obj=>obj.id === siteDtoRes.id);
			this.sites[index].clientName = siteDtoRes.clientName;
			this.sites[index].siteName = siteDtoRes.siteName;
			this.sites[index].apiKey = siteDtoRes.apiKey;
			this.sites[index].sheetId = siteDtoRes.sheetId;
			this.sites[index].toolType = siteDtoRes.toolType;
		}

		alertDto = this.alertDtoBuilder.withCode(IOCode.OK)
		.withStatus(false)
		.withTitle(IOMsg.SUCCESS_HEAD)
		.withBody(IOMsg.OK)
		.build();

		return Promise.resolve(alertDto);
	}

	getSites(): SiteDto[] {
		return this.sites;
	}
}
