import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PAGE_QUERY_PARAM_NAME, SEARCH_PARAMS_NAME } from '../../core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SearchComponent,
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatButtonModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: {
                                [SEARCH_PARAMS_NAME]: 'test'
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize searchTextControl with query param value', () => {
        expect(component.searchTextControl.value).toBe('test');
    });

    it('should update query params when searchTextControl value changes', fakeAsync(() => {
        const navigateSpy = spyOn(router, 'navigate');
        component.searchTextControl.setValue('new search');
        tick(500); // debounce time
        expect(navigateSpy).toHaveBeenCalledWith([], {
            queryParams: {
                [PAGE_QUERY_PARAM_NAME]: 0,
                [SEARCH_PARAMS_NAME]: 'new search'
            },
            queryParamsHandling: 'merge',
            relativeTo: activatedRoute
        });
    }));

    it('should clear search text when clearSearch is called', () => {
        component.clearSearch();
        expect(component.searchTextControl.value).toBeNull();
    });

    it('should show clear button when searchTextControl has value', () => {
        component.searchTextControl.setValue('test');
        fixture.detectChanges();
        const clearButton = fixture.debugElement.query(By.css('button[matSuffix]'));
        expect(clearButton).toBeTruthy();
    });

    it('should not show clear button when searchTextControl is empty', () => {
        component.searchTextControl.setValue('');
        fixture.detectChanges();
        const clearButton = fixture.debugElement.query(By.css('button[matSuffix]'));
        expect(clearButton).toBeFalsy();
    });

    it('should clear search text when clear button is clicked', () => {
        component.searchTextControl.setValue('test');
        fixture.detectChanges();
        const clearButton = fixture.debugElement.query(By.css('button[matSuffix]'));
        clearButton.nativeElement.click();
        fixture.detectChanges();
        expect(component.searchTextControl.value).toBeNull();
    });
});
