import { UserService} from "../UserService";
import {inject, injectable} from "inversify";
import axios, {AxiosError} from "axios";
import {UDB, UserDtoBuilder} from "../../dtos/builders/UserDtoBuilder";
import {ADB, AlertDtoBuilder} from "../../dtos/builders/AlertDtoBuilder";
import {UserDto} from "../../dtos/UserDto";
import {AlertDto} from "../../dtos/AlertDto";
import {ResponseDto} from "../../dtos/ResponseDto";
import AppConstants from "../../common/AppConstants";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";

@injectable()
export class UserServiceImpl implements UserService{

	@inject(UDB)
	private readonly userDtoBuilder!: UserDtoBuilder;

	@inject(ADB)
	private readonly alertDtoBuilder!: AlertDtoBuilder;

	async register(userDto: UserDto): Promise<AlertDto> {
		try {

			const res = await axios.post<ResponseDto>(AppConstants.baseUrl+"users/register", {
				email: userDto.email,
				password: userDto.password
			});

			const alertDto = this.alertDtoBuilder.withCode(res.data.code)
			.withBody(res.data.msg)
			.withTitle(res.data.code === IOCode.OK ? IOMsg.SUCCESS_HEAD : IOMsg.ERROR_HEAD)
			.withStatus(res.data.code !== IOCode.OK)
			.build();

			return Promise.resolve(alertDto);

			// @ts-ignore
		}catch (e: AxiosError) {
			const alertDto = this.alertDtoBuilder.withCode(IOCode.ERROR)
			.withBody(e.message)
			.withTitle(IOMsg.ERROR_HEAD)
			.withStatus(true)
			.build();
			return Promise.resolve(alertDto);
		}
	}

	async login(userDto: UserDto): Promise<UserDto> {

		try {
			const res = await axios.post<ResponseDto>(AppConstants.baseUrl+"auth/login", {
				email: userDto.email,
				password: userDto.password
			});

			const userDtoBuilder: UserDtoBuilder = this.userDtoBuilder
			.withMsg(res.data.msg)
			.withCode(res.data.code)

			if (res.data.code === IOCode.OK){
				userDtoBuilder.withAuthToken(res.data.authToken);
				userDtoBuilder.withRefreshToken(res.data.refreshToken)
			}

			return Promise.resolve(userDtoBuilder.build());

			// @ts-ignore
		}catch (e: AxiosError) {
			const user = this.userDtoBuilder.withMsg(e.message)
			.withCode(IOCode.ERROR)
			.build();
			return Promise.resolve(user);
		}
	}

}
