import {IOCode} from "../common/IOCode";

export class AlertDto{
	title: string  = "";
	body: string = "";
	code: number = IOCode.EMPTY;
	status: boolean = false;
}
