import {UserComponentModel} from "./UserComponentModel";
import {MetaDto} from "../../../dtos/MetaDto";
import {inject, injectable} from "inversify";
import {AlertDto} from "../../../dtos/AlertDto";
import {action, makeObservable, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {AuthorizedUserDto} from "../../../dtos/AuthorizedUserDto";

@injectable()
export class UserComponentModelImpl implements UserComponentModel{
	id: number = 0;
	email: string = "";
	isFormValid: boolean = false;
	isModalOpen: boolean = false;
	meta: MetaDto | null = null;
	users: AuthorizedUserDto[] = [];

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	constructor() {
		makeObservable(this, {
			id: observable,
			email: observable,
			isModalOpen: observable,
			isFormValid: observable,
			meta: observable,
			users: observable,
			deleteUser: action,
			doSubmitForm: action,
			emptyModelData: action,
			fetchUsers: action,
			onInputChange: action,
			onModelToggle: action,
			setModelData: action,
			validateForm: action
		});
	}

	deleteUser(id: number): Promise<AlertDto> {
		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
		.withStatus(true)
		.withTitle(IOMsg.ERROR_HEAD)
		.withBody(IOMsg.ERROR_BODY)
		.build();
		return Promise.resolve(alertDto);
	}

	doSubmitForm(e: FormEvent<HTMLFormElement>): Promise<AlertDto> {
		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
		.withStatus(true)
		.withTitle(IOMsg.ERROR_HEAD)
		.withBody(IOMsg.ERROR_BODY)
		.build();
		return Promise.resolve(alertDto);
	}

	emptyModelData(): boolean {
		return false;
	}

	fetchUsers(page: number, limit: number): Promise<AlertDto> {
		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
		.withStatus(true)
		.withTitle(IOMsg.ERROR_HEAD)
		.withBody(IOMsg.ERROR_BODY)
		.build();
		return Promise.resolve(alertDto);
	}

	onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
	}

	onModelToggle(status: boolean): void {
	}

	setModelData(userDto: AuthorizedUserDto): Promise<boolean> {
		return Promise.resolve(false);
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		return false;
	}

	changUserStatus(id: number): Promise<AlertDto> {
		let alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
		.withStatus(true)
		.withTitle(IOMsg.ERROR_HEAD)
		.withBody(IOMsg.ERROR_BODY)
		.build();
		return Promise.resolve(alertDto);
	}
}
