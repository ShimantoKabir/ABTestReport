import {ProtectedComponentModel} from "./ProtectedComponentModel";
import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import AppConstants from "../../common/AppConstants";
import {CookieService, CS} from "../../services/cookie/CookieService";

@injectable()
export class ProtectedComponentModelImpl implements ProtectedComponentModel{
	isProtectComponentDisplayed: boolean = false;

	@inject(CS)
	private readonly cookieService!: CookieService;

	constructor() {
		makeObservable(this, {
			isProtectComponentDisplayed: observable,
			displayProtectComponent: action
		});
	}

	displayProtectComponent(status: boolean): void {
		if (status){
			const refreshToken = this.cookieService.getInstance().get(AppConstants.refreshTokenCookieName)
			if (refreshToken){
				this.isProtectComponentDisplayed = true;
			}
		}else {
			this.isProtectComponentDisplayed = status;
		}
	}
}
