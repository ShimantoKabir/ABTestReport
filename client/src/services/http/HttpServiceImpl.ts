import {HttpService} from "./HttpService";
import axios, {AxiosInstance} from "axios";
import {Cookies} from "react-cookie";
import AppConstants from "../../common/AppConstants";
import {inject, injectable} from "inversify";
import {UDB, UserDtoBuilder} from "../../dtos/builders/UserDtoBuilder";
import {CookieService, CS} from "../cookie/CookieService";

@injectable()
export class HttpServiceImpl implements HttpService{

	private readonly axiosInstance : AxiosInstance;
	private readonly baseUrl = AppConstants.baseUrl;

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	@inject(CS)
	private readonly cookieService!: CookieService;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	getInstance(): AxiosInstance {


		const cookies = new Cookies();
		const authToken = cookies.get(AppConstants.authTokenCookieName);
		const refreshToken = cookies.get(AppConstants.refreshTokenCookieName);

		this.axiosInstance.interceptors.request.use(async config => {

			if (authToken){
				config.headers = {
					'Authorization': 'Bearer '+ authToken
				}
			}else {
				console.log("Token Refreshed!");
				try {
					const refreshRes = await axios({
						method: 'post',
						url: AppConstants.baseUrl+'users/refresh',
						headers : {
							'Authorization': 'Bearer '+ refreshToken
						}
					});

					const userDto = this.userDtoBuilder.withAuthToken(refreshRes.data.authToken)
						.withRefreshToken(refreshRes.data.refreshToken)
						.build();

					this.cookieService.setAuthCookie(userDto);

					config.headers = {
						'Authorization': 'Bearer '+ refreshRes.data.authToken
					}
				}catch (e) {
					console.log("AuthRefreshError=",e);
				}
			}
			return config
		})
		return this.axiosInstance;
	}
}
