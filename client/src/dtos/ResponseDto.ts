import {PaginationDto} from "./PaginationDto";
import {SiteDto} from "./SiteDto";

export class ResponseDto{
	code!: number;
	msg!: string;
	authToken!: string;
	refreshToken!: string;
	sites!: PaginationDto<SiteDto>;
	site!: SiteDto
}
