import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PaginationComponent } from './pagination.component';
import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE_OPTIONS,
    PAGE_QUERY_PARAM_NAME,
    PAGE_SIZE_QUERY_PARAM_NAME
} from '../../core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PaginationComponent,
                MatPaginator,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: {
                                [PAGE_SIZE_QUERY_PARAM_NAME]: DEFAULT_PAGE_SIZE
                            }
                        },
                        queryParams: of({
                            [PAGE_QUERY_PARAM_NAME]: 2
                        })
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values for inputs', () => {
        expect(component.pageSize).toBe(DEFAULT_PAGE_SIZE);
        expect(component.pageSizeOptions).toEqual(DEFAULT_PAGE_SIZE_OPTIONS);
    });

    it('should update queryParams on page change', () => {
        const navigateSpy = spyOn(router, 'navigate');
        const pageEvent: PageEvent = {
            pageIndex: 1,
            pageSize: 25,
            length: 100
        };

        component.onPageChange(pageEvent);

        expect(navigateSpy).toHaveBeenCalledWith([], {
            queryParams: {
                [PAGE_QUERY_PARAM_NAME]: 1,
                [PAGE_SIZE_QUERY_PARAM_NAME]: 25
            },
            queryParamsHandling: 'merge',
            relativeTo: activatedRoute
        });
    });
});
