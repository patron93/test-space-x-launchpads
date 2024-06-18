import { Params } from '@angular/router';
import {
    DEFAULT_PAGE_SIZE,
    PAGE_OFFSET_PARAM_NAME,
    PAGE_QUERY_PARAM_NAME,
    PAGE_SIZE_QUERY_PARAM_NAME,
    SEARCH_PARAMS_NAME
} from './constants';

export class RequestParamsBuilder {
    protected query: Params = {};

    constructor(
        protected params: Params,
    ) {
    }

    public addCommon(): this {
        return this
            .addSearch()
            .addOffset()
            .addSingleOption(PAGE_QUERY_PARAM_NAME)
            .addSingleOption(PAGE_SIZE_QUERY_PARAM_NAME, DEFAULT_PAGE_SIZE);
    }

    public addSearch(): this {
        const search = this.params[SEARCH_PARAMS_NAME];

        if (search) {
            this.query[SEARCH_PARAMS_NAME] = search;
        }
        return this;
    }

    public addOffset(): this {
        const page = this.params[PAGE_QUERY_PARAM_NAME];
        const size = this.params[PAGE_SIZE_QUERY_PARAM_NAME];
        if (page) {
            this.query[PAGE_OFFSET_PARAM_NAME] = page * size;
        }

        return this;
    }

    public value(): Params {
        return this.query;
    }

    public addSingleOption(requestParamName: string, defaultValue?: string | number): this {
        const param = this.params[requestParamName] ?? defaultValue;
        if (param) {
            this.query[requestParamName] = param;
        }
        return this;
    }
}
