import {ProtectedComponentModel} from "./ProtectedComponentModel";
import {injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";

@injectable()
export class ProtectedComponentModelImpl implements ProtectedComponentModel{
	isProtectComponentDisplayed: boolean = false;

	constructor() {
		makeObservable(this, {
			isProtectComponentDisplayed: observable,
			displayProtectComponent: action
		});
	}

	displayProtectComponent(status: boolean): void {
		this.isProtectComponentDisplayed = status;
	}
}
