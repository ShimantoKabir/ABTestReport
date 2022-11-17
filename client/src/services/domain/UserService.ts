import {UserDto} from "../../dtos/UserDto";
import {AlertDto} from "../../dtos/AlertDto";

export const US = "US";
export interface UserService{
	register(userDto: UserDto) : Promise<AlertDto>;
	login(userDto: UserDto): Promise<UserDto>
}
