import { Component, Input } from '@angular/core';
import { NgOptimizedImage, NgStyle, UpperCasePipe } from '@angular/common';
import { AVATAR_DEFAULT_SIZE } from '../../core';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [
        NgStyle,
        NgOptimizedImage,
        UpperCasePipe
    ],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
    @Input({ required: true }) imageUrl: string;
    @Input({ required: true }) altText: string = 'Avatar';
    @Input() size: number = AVATAR_DEFAULT_SIZE;
}
