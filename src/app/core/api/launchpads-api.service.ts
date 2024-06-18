import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaunchpadDto, LaunchpadRequestParams, PageableResponse } from '../typings';
import { API_URL } from '../constants';
import { buildLaunchpadsQuery } from './launchpads-api.query';

@Injectable({
    providedIn: 'root',
})
export class LaunchpadsApiService {
    private apiUrl = `${API_URL}/launchpads/query`;
    private http: HttpClient = inject(HttpClient);

    public getLaunchpads(params: LaunchpadRequestParams): Observable<PageableResponse<LaunchpadDto>> {
        return this.http.post<PageableResponse<LaunchpadDto>>(this.apiUrl, buildLaunchpadsQuery(params));
    }
}
