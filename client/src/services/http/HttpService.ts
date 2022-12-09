import {AxiosInstance} from "axios";

export const HS = "HS";
export interface HttpService {
	getInstance(): AxiosInstance
}
