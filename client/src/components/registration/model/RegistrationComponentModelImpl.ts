import {RegistrationComponentModel} from "./RegistrationComponentModel";
import {ChangeEvent, FormEvent} from "react";
import {action, makeObservable, observable} from "mobx";
import {inject, injectable} from "inversify";
import {AlertDto} from "../../../dtos/AlertDto";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {US, UserService} from "../../../services/domain/UserService";

@injectable()
export class RegistrationComponentModelImpl implements RegistrationComponentModel{

	email: string = "";
	password: string = "";
	isFormValid: boolean = false;

	@inject(US)
	private readonly userService!: UserService;

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	constructor() {
		makeObservable(this, {
			email: observable,
			password: observable,
			isFormValid: observable,
			onInputChange: action,
			onRegistration: action,
			validateForm: action
		});
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		if (e.target.id === "formBasicEmail"){
			this.email = e.target.value;
		}else if (e.target.id === "formBasicPassword"){
			this.password = e.target.value;
		}
	}

	async onRegistration(): Promise<AlertDto> {
		const user = this.userDtoBuilder.withEmail(this.email)
		.withPassword(this.password)
		.build();
		return await this.userService.register(user);
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}

}
