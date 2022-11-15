import {UserDtoBuilder} from "../UserDtoBuilder";
import {injectable} from "inversify";
import {UserDto} from "../../UserDto";

@injectable()
export class UserDtoBuilderImpl implements UserDtoBuilder{

	userDto: UserDto;

	constructor() {
		this.userDto = new UserDto();
	}


	withAuthToken(authToken: string): this {
		this.userDto.authToken = authToken;
		return this;
	}

	withEmail(email: string): this {
		this.userDto.email = email;
		return this;
	}

	withPassword(password: string): this {
		this.userDto.password = password;
		return this;
	}

	withRefreshToken(refreshToken: string): this {
		this.userDto.refreshToken = refreshToken;
		return this;
	}

	withCode(code: number): this {
		this.userDto.code = code;
		return this;
	}

	withMsg(msg: string): this {
		this.userDto.msg = msg;
		return this;
	}

	build(): UserDto {
		return this.userDto;
	}
}
