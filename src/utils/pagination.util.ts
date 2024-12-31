import { PaginationQueryParamInterface, RequestQueryParamsInterface } from "../interfaces";
import { defaultOrder, defaultSort, pageDefaultOffset, pageMaxLimit, pageMinLimit } from "../config";
import { SortEnum } from "../enums";

export class PaginationUtil {
    public static parseQueryParams(query: RequestQueryParamsInterface): PaginationQueryParamInterface {
        let offset = Number(query.offset) && Number(query.offset) > 0
            ? Number(query.offset)
            : pageDefaultOffset;

        let limit = query.limit ? Number(query.limit) : pageMinLimit;
        limit = Math.min(limit, pageMaxLimit);

        const sort = query.order ?? defaultSort;
        const order = Object.values(SortEnum).includes(query.order?.toLowerCase() as SortEnum)
            ? (query.order as SortEnum)
            : defaultOrder;

        return { offset, limit, order, sort };
    }
}
