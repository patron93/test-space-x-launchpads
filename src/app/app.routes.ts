import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'launchpads',
    },
    {
        path: 'launchpads',
        loadComponent: () =>
            import('./modules/launchpads/launchpads.component').then((x) => x.LaunchpadsComponent),
    }
];
