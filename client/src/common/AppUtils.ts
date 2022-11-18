import {UserDto} from "../dtos/UserDto";
import {Cookies} from "react-cookie";
import AppConstants from "./AppConstants";

export class AppUtils {

	static setCookies = (userDto: UserDto) => {
		let cookies = new Cookies();

		const date = new Date();
		const authTokenDate = date.setMinutes(date.getMinutes()+15);
		const refreshTokenDate = date.setDate(date.getDate()+7);

		cookies.set(
			AppConstants.loggedInCookieName,
			true,
			{
				path: '/',
				expires: new Date(refreshTokenDate)
			}
		);
		cookies.set(
			AppConstants.authTokenCookieName,
			userDto.authToken,
			{
				path: '/',
				expires: new Date(authTokenDate)
			}
		);
		cookies.set(
			AppConstants.refreshTokenCookieName,
			userDto.refreshToken,
			{
				path: '/',
				expires: new Date(refreshTokenDate)
			}
		);
	}
}
