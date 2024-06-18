import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
    MatAccordion,
    MatExpansionPanel, MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';

import { LaunchpadListHeaderComponent } from './launchpad-list-header/launchpad-list-header.component';
import { LaunchpadListInfoComponent } from './launchpad-list-info/launchpad-list-info.component';
import {
    LaunchpadDto,
    LaunchpadRequestParams,
    PageableResponse,
    RequestParamsBuilder,
    LaunchpadsApiService
} from '../../core';
import { AvatarComponent, SearchComponent, PaginationComponent } from '../../shared';

@Component({
    selector: 'app-launchpads',
    standalone: true,
    imports: [
        AsyncPipe,
        MatExpansionPanel,
        MatAccordion,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        AvatarComponent,
        LaunchpadListHeaderComponent,
        LaunchpadListInfoComponent,
        PaginationComponent,
        MatProgressSpinner,
        SearchComponent,
        MatExpansionPanelContent
    ],
    templateUrl: './launchpads.component.html',
    styleUrl: './launchpads.component.scss'
})
export class LaunchpadsComponent implements OnInit {
    public launchpads: LaunchpadDto[];
    public launchpadsCount: number;
    public pageIndex: number;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private destroyRef: DestroyRef = inject(DestroyRef);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private launchpadsApiService: LaunchpadsApiService = inject(LaunchpadsApiService)

    public ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(
                switchMap(params => this.loadLaunchpads(this.buildParams(params))),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((res) => {
                this.launchpads = res.docs;
                this.launchpadsCount = res.totalDocs;
                this.pageIndex = res.page - 1;
            });
    }

    private loadLaunchpads(params: LaunchpadRequestParams): Observable<PageableResponse<LaunchpadDto>> {
        this.loading$.next(true);
        return this.launchpadsApiService.getLaunchpads(params)
            .pipe(
                finalize(() => this.loading$.next(false))
            )
    }

    private buildParams(params: Params): LaunchpadRequestParams {
        return new RequestParamsBuilder(params)
            .addCommon()
            .value();
    }
}
