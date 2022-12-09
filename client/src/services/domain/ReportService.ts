import {ReportDto} from "../../dtos/ReportDto";

export const RS = "RS";
export interface ReportService {
	init() : Promise<ReportDto|null>;
	populate(reportDto: ReportDto) : Promise<boolean>;
}
