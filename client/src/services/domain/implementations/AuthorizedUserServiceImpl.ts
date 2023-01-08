import {AuthorizedUserService} from "../AuthorizedUserService";
import {AuthorizedUserDto} from "../../../dtos/AuthorizedUserDto";
import {PaginationDto} from "../../../dtos/PaginationDto";
import {injectable} from "inversify";

@injectable()
export class AuthorizedUserServiceImpl implements AuthorizedUserService{
	active(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	delete(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	edit(userDto: AuthorizedUserDto): Promise<AuthorizedUserDto | null> {
		return Promise.resolve(null);
	}

	getAll(page: number, limit: number): Promise<PaginationDto<AuthorizedUserDto> | null> {
		return Promise.resolve(null);
	}

	save(userDto: AuthorizedUserDto): Promise<AuthorizedUserDto | null> {
		return Promise.resolve(null);
	}

}
