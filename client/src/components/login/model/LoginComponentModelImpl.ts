import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {ChangeEvent, FormEvent} from "react";
import {LoginComponentModel} from "./LoginComponentModel";
import {AlertDto} from "../../../dtos/AlertDto";
import {IOCode} from "../../../common/IOCode";
import {IOMsg} from "../../../common/IOMsg";
import {UserDto} from "../../../dtos/UserDto";
import {UDB, UserDtoBuilder} from "../../../dtos/builders/UserDtoBuilder";
import AppConstants from "../../../common/AppConstants";
import {Cookies} from "react-cookie";
import {ADB, AlertDtoBuilder} from "../../../dtos/builders/AlertDtoBuilder";
import {US, UserService} from "../../../services/UserService";

@injectable()
export class LoginComponentModelImpl implements LoginComponentModel {

	email: string = "";
	password: string = "";
	isFormValid: boolean = false;
	isLoggedIn: boolean = false;

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
			isLoggedIn: observable,
			onInputChange: action,
			onLogin: action,
			validateForm: action
		});
	}

	async onLogin(): Promise<AlertDto> {

		const userDto: UserDto = this.userDtoBuilder
		.withEmail(this.email)
		.withPassword(this.password)
		.build();

		const userDtoRes = await this.userService.login(userDto)

		const isOk = userDtoRes.code === IOCode.OK;

		if (isOk){
			this.setCookies(userDtoRes);
			this.isLoggedIn = true;
		}

		const alertDto = this.alertDtoBuilder.withCode(userDtoRes.code)
		.withTitle(isOk ? IOMsg.SUCCESS_HEAD : IOMsg.ERROR_HEAD)
		.withStatus(!isOk)
		.withBody(userDtoRes.msg)
		.build();

		return Promise.resolve(alertDto);
	}

	setCookies(userDto: UserDto){
		let cookies = new Cookies();
		cookies.set(
			AppConstants.loggedInCookieName,
			true,
			{
				path: '/'
			}
		);
		cookies.set(
			AppConstants.authTokenCookieName,
			userDto.authToken,
			{
				path: '/',
			}
		);
		cookies.set(
			AppConstants.refreshTokenCookieName,
			userDto.refreshToken,
			{
				path: '/'
			}
		);
	}

	onInputChange(e: ChangeEvent<HTMLInputElement>): void {
		if (e.target.id === "formBasicEmail"){
			this.email = e.target.value;
		}else if (e.target.id === "formBasicPassword"){
			this.password = e.target.value;
		}
	}

	validateForm(e: FormEvent<HTMLFormElement>): boolean {
		e.preventDefault();
		e.stopPropagation();
		this.isFormValid = !e.currentTarget.checkValidity();
		return e.currentTarget.checkValidity();
	}
}
