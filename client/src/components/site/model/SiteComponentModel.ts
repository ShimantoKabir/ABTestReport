import {SiteDto} from "../../../dtos/SiteDto";
import {KeyValue} from "../../../dtos/KeyValue";
import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";
import {MetaDto} from "../../../dtos/MetaDto";

export const SCM = "SCM";
export interface SiteComponentModel {
	id: number;
	isModalOpen: boolean;
	clientName: string;
	isFormValid: boolean;
	siteName: string;
	toolType: number;
	apiKey: string;
	sheetId: string;
	isActive: boolean;
	meta: MetaDto|null,
	sites: SiteDto[];
	getToolTypes() : KeyValue<number>[];
	getSites(page: number, limit: number) : Promise<AlertDto>;
	changSiteStatus(id: number) : Promise<AlertDto>;
	deleteSite(id: number) : Promise<AlertDto>;
	onModelToggle(status: boolean) : void;
	validateForm(e: FormEvent<HTMLFormElement>) : boolean;
	doSubmitForm(e: FormEvent<HTMLFormElement>) : Promise<AlertDto>;
	onInputChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) : void;
	setModelData(siteDto: SiteDto) : Promise<boolean>;
	emptyModelData() : boolean;
}
