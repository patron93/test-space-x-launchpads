import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchpadsComponent } from './launchpads.component';
import { LaunchpadListHeaderComponent } from './launchpad-list-header/launchpad-list-header.component';
import { LaunchpadListInfoComponent } from './launchpad-list-info/launchpad-list-info.component';
import { AvatarComponent, SearchComponent, PaginationComponent } from '../../shared';
import {
    DEFAULT_PAGE_SIZE,
    LaunchpadDto,
    LaunchpadsApiService,
    PAGE_SIZE_QUERY_PARAM_NAME,
    PageableResponse
} from '../../core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LaunchpadsComponent', () => {
    let component: LaunchpadsComponent;
    let fixture: ComponentFixture<LaunchpadsComponent>;
    let launchpadsApiService: jasmine.SpyObj<LaunchpadsApiService>;

    const mockLaunchpads: LaunchpadDto[] = [
        {
            id: '1',
            name: 'Launchpad 1',
            details: 'Details 1',
            locality: 'Locality 1',
            region: 'Region 1',
            images: {
                large: ['https://example.com/image1.jpg']
            },
            launches: [
                {
                    id: 'launch1',
                    name: 'Launch 1',
                    date_utc: '2023-06-18T00:00:00Z'
                }
            ]
        },
        {
            id: '2',
            name: 'Launchpad 2',
            details: 'Details 2',
            locality: 'Locality 2',
            region: 'Region 2',
            images: {
                large: ['https://example.com/image2.jpg']
            },
            launches: [
                {
                    id: 'launch2',
                    name: 'Launch 2',
                    date_utc: '2023-07-18T00:00:00Z'
                }
            ]
        }
    ];

    beforeEach(async () => {
        const launchpadsApiServiceSpy = jasmine.createSpyObj('LaunchpadsApiService', ['getLaunchpads']);
        await TestBed.configureTestingModule({
            imports: [
                MatProgressSpinnerModule,
                MatExpansionModule,
                LaunchpadsComponent,
                LaunchpadListHeaderComponent,
                LaunchpadListInfoComponent,
                AvatarComponent,
                SearchComponent,
                PaginationComponent,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: LaunchpadsApiService, useValue: launchpadsApiServiceSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({ page: 1 }),
                        snapshot: {
                            queryParams: {
                                [PAGE_SIZE_QUERY_PARAM_NAME]: DEFAULT_PAGE_SIZE
                            }
                        },
                    }
                }
            ]
        }).compileComponents();

        launchpadsApiService = TestBed.inject(LaunchpadsApiService) as jasmine.SpyObj<LaunchpadsApiService>;
        launchpadsApiService.getLaunchpads.and.returnValue(of({
            docs: mockLaunchpads,
            totalDocs: 2,
            page: 1
        } as PageableResponse<LaunchpadDto>));
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LaunchpadsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display search and pagination components', () => {
        const searchComponent = fixture.debugElement.query(By.directive(SearchComponent));
        const paginationComponent = fixture.debugElement.query(By.directive(PaginationComponent));
        expect(searchComponent).toBeTruthy();
        expect(paginationComponent).toBeTruthy();
    });

    it('should display a list of launchpads', () => {
        const launchpadElements = fixture.debugElement.queryAll(By.directive(LaunchpadListHeaderComponent));
        expect(launchpadElements.length).toBe(mockLaunchpads.length);
    });

    it('should display loading spinner when loading$', () => {
        component.loading$.next(true);
        fixture.detectChanges();
        const spinnerElement = fixture.debugElement.query(By.css('.c-launchpads__loading-progress'));
        expect(spinnerElement).toBeTruthy();
    });

    it('should hide loading spinner when not loading', () => {
        component.loading$.next(false);
        fixture.detectChanges();
        const spinnerElement = fixture.debugElement.query(By.css('.c-launchpads__loading-progress'));
        expect(spinnerElement).toBeNull();
    });

    it('should call loadLaunchpads with correct parameters on initialization', () => {
        expect(launchpadsApiService.getLaunchpads).toHaveBeenCalledWith(jasmine.objectContaining({
            page: 1,
            limit: jasmine.any(Number),
            offset: jasmine.any(Number)
        }));
    });
});
