import {SiteDto} from "../../dtos/SiteDto";
import {PaginationDto} from "../../dtos/PaginationDto";

export const SS = "SS";
export interface SiteService {
	save(siteDto: SiteDto) : Promise<SiteDto|null>;
	edit(siteDto: SiteDto) : Promise<SiteDto|null>;
	delete(id: number) : Promise<boolean>;
	getAll(page: number, limit: number): Promise<PaginationDto<SiteDto>|null>
}
