import {ChangeEvent, FormEvent} from "react";
import {AlertDto} from "../../../dtos/AlertDto";

export const LCM = "LCM";
export interface LoginComponentModel {
	email: string;
	password: string;
	isLoggedIn: boolean;
	isFormValid: boolean;
	onInputChange(e: ChangeEvent<HTMLInputElement>): void;
	validateForm(e: FormEvent<HTMLFormElement>): boolean;
	onLogin() : Promise<AlertDto>;
}
