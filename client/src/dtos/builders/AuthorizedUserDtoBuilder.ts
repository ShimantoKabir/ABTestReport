import {AuthorizedUserDto} from "../AuthorizedUserDto";

export const UDB = "UDB";
export interface AuthorizedUserDtoBuilder{
	withId(id: number): this;
	withMsg(msg: string): this;
	withCode(code: number): this;
	withEmail(email: string): this;
	withStatus(status: boolean) : this
	build() : AuthorizedUserDto
}
