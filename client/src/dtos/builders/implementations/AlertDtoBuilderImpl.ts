import {AlertDtoBuilder} from "../AlertDtoBuilder";
import {AlertDto} from "../../AlertDto";
import {injectable} from "inversify";

@injectable()
export class AlertDtoBuilderImpl implements AlertDtoBuilder{

	alertDto : AlertDto;

	constructor() {
		this.alertDto = new AlertDto();
	}

	build(): AlertDto {
		return this.alertDto;
	}

	withBody(body: string): this {
		this.alertDto.body = body;
		return this;
	}

	withCode(code: number): this {
		this.alertDto.code = code;
		return this;
	}

	withStatus(status: boolean): this {
		this.alertDto.status = status;
		return this;
	}

	withTitle(title: string): this {
		this.alertDto.title = title;
		return this;
	}

}
