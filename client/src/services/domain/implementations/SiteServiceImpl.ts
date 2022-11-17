import {SiteService} from "../SiteService";
import {SiteDto} from "../../../dtos/SiteDto";
import {resolve} from "inversify-react";
import {HS, HttpService} from "../../http/HttpService";
import {ResponseDto} from "../../../dtos/ResponseDto";
import {injectable} from "inversify";

@injectable()
export class SiteServiceImpl implements SiteService{

	@resolve(HS)
	private readonly httpService!: HttpService;

	delete(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	edit(siteDto: SiteDto): Promise<SiteDto|null> {
		return Promise.resolve(null);
	}

	get(page: number, limit: number): Promise<ResponseDto[]|null> {
		return Promise.resolve(null);
	}

	save(siteDto: SiteDto): Promise<SiteDto|null> {
		return Promise.resolve(null);
	}
}
