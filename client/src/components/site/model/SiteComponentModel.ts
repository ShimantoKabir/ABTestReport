import {SiteDto} from "../../../dtos/SiteDto";
import {KeyValue} from "../../../dtos/KeyValue";
import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";
import {MetaDto} from "../../../dtos/MetaDto";

export const SCM = "SCM";
export interface SiteComponentModel {
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
	getToolTypes() : KeyValue[];
	getSites(page: number, limit: number) : Promise<AlertDto>;
	saveSite(e: FormEvent<HTMLFormElement>): void;
	updateSite(siteDto: SiteDto) : void;
	changSiteStatus(id: number) : void;
	deleteSite(id: number) : Promise<boolean>;
	onModelToggle(status: boolean) : void;
	validateForm(e: FormEvent<HTMLFormElement>) : boolean;
	onInputChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) : void;
}
