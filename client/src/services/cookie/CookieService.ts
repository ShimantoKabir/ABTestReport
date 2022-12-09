import Cookies from "universal-cookie/cjs/Cookies";
import {UserDto} from "../../dtos/UserDto";

export const CS = "CS";
export interface CookieService {
	getInstance() : Cookies;
	setAuthCookie(userDto: UserDto) : void
}
