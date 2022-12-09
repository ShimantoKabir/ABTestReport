import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";

export const RCM = "RCM";
export interface RegistrationComponentModel{
	email: string;
	password: string;
	isFormValid: boolean;
	validateForm(e: FormEvent<HTMLFormElement>) : boolean;
	onInputChange(e: ChangeEvent<HTMLInputElement>): void;
	onRegistration(): Promise<AlertDto>;
}
