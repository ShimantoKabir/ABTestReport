import {AuthorizedUserDtoBuilder} from "../AuthorizedUserDtoBuilder";
import {AuthorizedUserDto} from "../../AuthorizedUserDto";
import {injectable} from "inversify";

@injectable()
export class AuthorizedUserDtoBuilderImpl implements AuthorizedUserDtoBuilder{

	authorizedUserDto : AuthorizedUserDto;

	constructor() {
		this.authorizedUserDto = new AuthorizedUserDto();
	}

	withCode(code: number): this {
		this.authorizedUserDto.code = code;
		return this;
	}

	withEmail(email: string): this {
		this.authorizedUserDto.email = email;
		return this;
	}

	withId(id: number): this {
		this.authorizedUserDto.id = id;
		return this;
	}

	withMsg(msg: string): this {
		this.authorizedUserDto.msg = msg;
		return this;
	}

	withStatus(status: boolean): this {
		this.authorizedUserDto.status = status;
		return this;
	}

	build(): AuthorizedUserDto {
		return this.authorizedUserDto;
	}
}
