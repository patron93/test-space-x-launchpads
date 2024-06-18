export * from './api/launchpad-dto';

export interface PageableResponse<T> {
    docs: T[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}
