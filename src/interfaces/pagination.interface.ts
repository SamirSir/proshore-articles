import { SortEnum } from "../enums";

export interface RequestQueryParamsInterface {
    page?: number;
    limit?: number;
    order?: string;
    sort?: string;
}

export interface PaginationQueryParamInterface {
    offset: number;
    limit: number;
    order: SortEnum;
    sort: string;
}
