import { Component, Input } from '@angular/core';
import { LaunchpadDto } from '../../../core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-launchpad-list-info',
    standalone: true,
    imports: [
        MatList,
        MatListItem,
        MatDivider,
        DatePipe
    ],
    templateUrl: './launchpad-list-info.component.html',
    styleUrl: './launchpad-list-info.component.scss'
})
export class LaunchpadListInfoComponent {
    @Input({ required: true }) public launchpad: LaunchpadDto;
}
