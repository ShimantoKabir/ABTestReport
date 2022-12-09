import {MetaDto} from "./MetaDto";

export class PaginationDto<T>{
	items!: T[];
	meta!: MetaDto
}
