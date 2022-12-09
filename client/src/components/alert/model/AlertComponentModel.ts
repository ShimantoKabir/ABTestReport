import {AlertDto} from "../../../dtos/AlertDto";

export const ACM = "ACM";
export interface AlertComponentModel{
	title: string;
	body: string;
	code: number;
	status: boolean;
	changeModalState(dto: AlertDto): void;
	openOrClose(status: boolean): void;
	startLoading(): void;
}
