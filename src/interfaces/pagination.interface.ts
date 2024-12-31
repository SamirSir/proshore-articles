import { SortEnum } from "../enums";

export interface RequestQueryParamsInterface {
    offset?: any;
    limit?: any;
    order?: string;
    sort?: string;
}

export interface PaginationQueryParamInterface {
    offset: number;
    limit: number;
    order: SortEnum;
    sort: string;
}
