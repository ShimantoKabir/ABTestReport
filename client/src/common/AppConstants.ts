export default class AppConstants {
	public static baseUrl = "http://localhost:3001/";
	// public static baseUrl = "https://abtestreport-production.up.railway.app/";
	public static axiosHeader = {
		'Content-Type': 'application/json'
	};
	public static getAxiosHeader = () => {
		return {
			'Content-Type': 'application/json',
			'Authorization': GetJwtToken()
		}
	};
	public static loggedInCookieName = "isLoggedIn";
	public static jwtCookieName = "jwt";
}

function GetJwtToken() : string {
	const cookieObj: { isLoggedIn: boolean, jwt: string } =
	document.cookie.split('; ').reduce((prev: any, current: string) => {
		const [name, ...value] = current.split('=');
		prev[name] = value.join('=');
		return prev;
	}, {});
	return cookieObj.jwt;
}
