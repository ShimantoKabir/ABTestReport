import {SiteService} from "../SiteService";
import {SiteDto} from "../../../dtos/SiteDto";
import {HS, HttpService} from "../../http/HttpService";
import {ResponseDto} from "../../../dtos/ResponseDto";
import {inject, injectable} from "inversify";
import {PaginationDto} from "../../../dtos/PaginationDto";
import {IOCode} from "../../../common/IOCode";

@injectable()
export class SiteServiceImpl implements SiteService{

	@inject(HS)
	private readonly httpService!: HttpService;

	delete(id: number): Promise<boolean> {
		return Promise.resolve(false);
	}

	edit(siteDto: SiteDto): Promise<SiteDto|null> {
		return Promise.resolve(null);
	}

	async getAll(page: number, limit: number): Promise<PaginationDto<SiteDto>|null> {
		const res = await this.httpService.getInstance().get<ResponseDto>("/sites");
		if (res.data.code === IOCode.OK){
			return res.data.sites;
		}
		return Promise.resolve(null);
	}

	save(siteDto: SiteDto): Promise<SiteDto|null> {
		return Promise.resolve(null);
	}
}
