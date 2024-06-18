import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../../../shared';
import { LaunchpadDto } from '../../../core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-launchpad-list-header',
    standalone: true,
    imports: [
        AvatarComponent,
        MatIcon,
        MatIconButton,
        MatAnchor,
    ],
    templateUrl: './launchpad-list-header.component.html',
    styleUrl: './launchpad-list-header.component.scss'
})
export class LaunchpadListHeaderComponent {
    @Input({ required: true }) public launchpad: LaunchpadDto;

}
