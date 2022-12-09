import {AlertDto} from "../AlertDto";

export const ADB = "ADB";
export interface AlertDtoBuilder{
	build() : AlertDto;
	withTitle(title: string): this;
	withBody(body: string): this;
	withCode(code: number): this;
	withStatus(status: boolean): this;
}
