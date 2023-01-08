import {MetaDto} from "../../../dtos/MetaDto";
import {AlertDto} from "../../../dtos/AlertDto";
import {ChangeEvent, FormEvent} from "react";
import {AuthorizedUserDto} from "../../../dtos/AuthorizedUserDto";

export const UCM = "UCM";
export interface UserComponentModel {
	id: number;
	email: string;
	isFormValid: boolean;
	isModalOpen: boolean;
	meta: MetaDto|null,
	users: AuthorizedUserDto[]
	fetchUsers(page: number, limit: number) : Promise<AlertDto>;
	deleteUser(id: number) : Promise<AlertDto>;
	onModelToggle(status: boolean) : void;
	validateForm(e: FormEvent<HTMLFormElement>) : boolean;
	doSubmitForm(e: FormEvent<HTMLFormElement>) : Promise<AlertDto>;
	onInputChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) : void;
	setModelData(userDto: AuthorizedUserDto) : Promise<boolean>;
	emptyModelData() : boolean;
	changUserStatus(id: number) : Promise<AlertDto>;
}
