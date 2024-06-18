import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { LaunchpadsComponent } from './modules/launchpads/launchpads.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatToolbar, NgOptimizedImage, LaunchpadsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
