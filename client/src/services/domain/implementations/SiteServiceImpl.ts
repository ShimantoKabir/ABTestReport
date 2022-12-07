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

	async delete(id: number): Promise<boolean> {
		try {
			const res = await this.httpService.getInstance().delete<ResponseDto>("/sites/"+id);

			if (res.data.code === IOCode.OK){
				return Promise.resolve(true);
			}
			return Promise.resolve(false);
		}catch (e) {
			return Promise.resolve(false);
		}
	}

	async edit(siteDto: SiteDto): Promise<SiteDto|null> {
		try {
			const res = await this.httpService.getInstance().put<ResponseDto>("/sites",{
				id: siteDto.id,
				clientName : siteDto.clientName,
				siteName : siteDto.siteName,
				toolType: siteDto.toolType,
				apiKey: siteDto.apiKey,
				sheetId: siteDto.sheetId,
				isActive: siteDto.isActive
			});

			if (res.data.code === IOCode.OK){
				return Promise.resolve(res.data.site);
			}
			return Promise.resolve(null);
		}catch (e) {
			return Promise.resolve(null);
		}
	}

	async getAll(page: number, limit: number): Promise<PaginationDto<SiteDto>|null> {
		const res = await this.httpService.getInstance().get<ResponseDto>("/sites");
		if (res.data.code === IOCode.OK){
			return res.data.sites;
		}
		return Promise.resolve(null);
	}

	async save(siteDto: SiteDto): Promise<SiteDto|null> {
		try {
			const res = await this.httpService.getInstance().post<ResponseDto>("/sites",{
				clientName : siteDto.clientName,
				siteName : siteDto.siteName,
				toolType: siteDto.toolType,
				apiKey: siteDto.apiKey,
				sheetId: siteDto.sheetId,
				isActive: false
			});

			if (res.data.code === IOCode.OK){
				return Promise.resolve(res.data.site);
			}
			return Promise.resolve(null);
		}catch (e) {
			return Promise.resolve(null);
		}
	}

	async active(id: number): Promise<boolean> {
		const res = await this.httpService.getInstance().get<ResponseDto>("/sites/active/"+id);
		if (res.data.code === IOCode.OK){
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}
}
