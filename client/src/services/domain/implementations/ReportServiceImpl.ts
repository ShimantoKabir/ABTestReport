import {ReportService} from "../ReportService";
import {ReportDto} from "../../../dtos/ReportDto";
import {inject, injectable} from "inversify";
import {HS, HttpService} from "../../http/HttpService";
import {ResponseDto} from "../../../dtos/ResponseDto";
import {IOCode} from "../../../common/IOCode";

@injectable()
export class ReportServiceImpl implements ReportService{

	@inject(HS)
	private readonly httpService!: HttpService;

	async init(): Promise<ReportDto | null> {
		try {
			const res = await this.httpService.getInstance().get<ResponseDto>("/experiment/init");

			if (res.data.code === IOCode.OK){
				return Promise.resolve(res.data.input);
			}

			return Promise.resolve(null);
		}catch (e) {
			return Promise.resolve(null);
		}
	}

	async populate(reportDto: ReportDto): Promise<boolean> {
		try {
			const res = await this.httpService.getInstance().post<ResponseDto>("/experiment/populate",{
				experimentId: reportDto.experimentId,
				startDate: reportDto.startDate,
				endDate: reportDto.endDate,
				deviceTypes: reportDto.deviceTypes,
				siteName: reportDto.siteName,
				sourceTypes: reportDto.sourceTypes
			});

			if (res.data.code === IOCode.OK){
				return Promise.resolve(true);
			}
			return Promise.resolve(false);
		}catch (e) {
			return Promise.resolve(false);
		}
	}
}
