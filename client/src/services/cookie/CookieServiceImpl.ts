import {CookieService} from "./CookieService";
import {Cookies} from "react-cookie";
import {injectable} from "inversify";
import {UserDto} from "../../dtos/UserDto";
import AppConstants from "../../common/AppConstants";

@injectable()
export class CookieServiceImpl implements CookieService{

	cookie = new Cookies();

	getInstance(): Cookies {
		return this.cookie;
	}

	setAuthCookie(userDto: UserDto): void {
		const date = new Date();
		const authTokenDate = date.setMinutes(date.getMinutes()+15);
		const refreshTokenDate = date.setDate(date.getDate()+7);

		this.cookie.set(
			AppConstants.loggedInCookieName,
			true,
			{
				path: '/',
				expires: new Date(refreshTokenDate)
			}
		);
		this.cookie.set(
			AppConstants.authTokenCookieName,
			userDto.authToken,
			{
				path: '/',
				expires: new Date(authTokenDate)
			}
		);
		this.cookie.set(
			AppConstants.refreshTokenCookieName,
			userDto.refreshToken,
			{
				path: '/',
				expires: new Date(refreshTokenDate)
			}
		);
	}
}
