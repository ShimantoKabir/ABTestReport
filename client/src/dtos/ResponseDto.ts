import {PaginationDto} from "./PaginationDto";
import {SiteDto} from "./SiteDto";
import {ReportDto} from "./ReportDto";

export class ResponseDto{
	code!: number;
	msg!: string;
	authToken!: string;
	refreshToken!: string;
	sites!: PaginationDto<SiteDto>;
	site!: SiteDto;
	input!: ReportDto;
}
