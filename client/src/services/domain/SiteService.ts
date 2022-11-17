import {SiteDto} from "../../dtos/SiteDto";
import {ResponseDto} from "../../dtos/ResponseDto";

export const SS = "SS";
export interface SiteService {
	save(siteDto: SiteDto) : Promise<SiteDto|null>;
	edit(siteDto: SiteDto) : Promise<SiteDto|null>;
	delete(id: number) : Promise<boolean>;
	get(page: number, limit: number): Promise<ResponseDto[]|null>
}
