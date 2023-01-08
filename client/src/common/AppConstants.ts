export default class AppConstants {
	public static baseUrl = "http://localhost:3001/";
	// public static baseUrl = "https://ab-test-report-server-production.up.railway.app/";
	public static getAxiosHeader = () => {
		return {
			'Content-Type': 'application/json',
			'Authorization': GetJwtToken()
		}
	};
	public static loggedInCookieName = "isLoggedIn";
	public static authTokenCookieName = "authToken";
	public static refreshTokenCookieName = "refreshToken";
}

function GetJwtToken(): string {
	const cookieObj: { isLoggedIn: boolean, jwt: string } =
		document.cookie.split('; ').reduce((prev: any, current: string) => {
			const [name, ...value] = current.split('=');
			prev[name] = value.join('=');
			return prev;
		}, {});
	return cookieObj.jwt;
}
