import {PaginationDto} from "../../dtos/PaginationDto";
import {AuthorizedUserDto} from "../../dtos/AuthorizedUserDto";

export const AUS = "AUS";
export interface AuthorizedUserService {
	save(userDto: AuthorizedUserDto) : Promise<AuthorizedUserDto|null>;
	edit(userDto: AuthorizedUserDto) : Promise<AuthorizedUserDto|null>;
	delete(id: number) : Promise<boolean>;
	getAll(page: number, limit: number): Promise<PaginationDto<AuthorizedUserDto>|null>;
	active(id: number) : Promise<boolean>;
}
