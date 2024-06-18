import { Component, inject, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
    PAGE_QUERY_PARAM_NAME,
    PAGE_SIZE_QUERY_PARAM_NAME
} from '../../core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [
        MatPaginator
    ],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
    private router: Router = inject(Router);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    @Input({ required: true }) public length: number;
    @Input() public pageSize: number = this.activatedRoute.snapshot.queryParams[PAGE_SIZE_QUERY_PARAM_NAME]
        ?? DEFAULT_PAGE_SIZE;
    @Input() public pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
    @Input() pageIndex: number;

    public onPageChange(page: PageEvent) {
        this.router.navigate([], {
            queryParams: {
                [PAGE_QUERY_PARAM_NAME]: page.pageIndex,
                [PAGE_SIZE_QUERY_PARAM_NAME]: page.pageSize,
            },
            queryParamsHandling: 'merge',
            relativeTo: this.activatedRoute,
        });
    }
}
