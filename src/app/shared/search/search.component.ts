import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGE_QUERY_PARAM_NAME, SEARCH_PARAMS_NAME } from '../../core';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        MatIcon,
        MatIconButton,
        MatLabel,
        ReactiveFormsModule,
        MatPrefix,
        MatSuffix,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
    public searchTextControl: FormControl<string> = new FormControl();

    private router: Router = inject(Router);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private destroyRef: DestroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        this.searchTextControl.setValue(this.activatedRoute.snapshot.queryParams[SEARCH_PARAMS_NAME]);

        this.searchTextControl.valueChanges
            .pipe(
                debounceTime(500),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(searchText => {
                this.changeSearchParam(searchText);
            });
    }

    public clearSearch(): void {
        this.searchTextControl.setValue(null);
    }

    private changeSearchParam(searchText: string): void {
        this.router.navigate([], {
            queryParams: {
                [PAGE_QUERY_PARAM_NAME]: 0,
                [SEARCH_PARAMS_NAME]: searchText,
            },
            queryParamsHandling: 'merge',
            relativeTo: this.activatedRoute,
        });
    }
}
