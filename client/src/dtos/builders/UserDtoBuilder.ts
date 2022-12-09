import {UserDto} from "../UserDto";

export const UDB = "UDB";
export interface UserDtoBuilder{
	withMsg(msg: string): this;
	withCode(code: number): this;
	withEmail(email: string): this;
	withPassword(password: string) : this
	withAuthToken(authToken: string): this;
	withRefreshToken(refreshToken: string): this;
	build() : UserDto
}
