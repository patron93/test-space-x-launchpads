import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from './avatar.component';
import { UpperCasePipe } from '@angular/common';
import { AVATAR_DEFAULT_SIZE } from '../../core';

describe('AvatarComponent', () => {
    let component: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpperCasePipe, AvatarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default size of default value', () => {
        expect(component.size).toBe(AVATAR_DEFAULT_SIZE);
    });

    it('should render image when imageUrl is provided', () => {
        component.imageUrl = 'https://example.com/avatar.jpg';
        component.altText = 'User Avatar';
        component.size = 100;
        fixture.detectChanges();

        const imgElement = fixture.debugElement.query(By.css('.c-avatar__image'));
        expect(imgElement).toBeTruthy();
        expect(imgElement.nativeElement.src).toContain('https://example.com/avatar.jpg');
        expect(imgElement.nativeElement.alt).toBe('User Avatar');
        expect(imgElement.nativeElement.width).toBe(100);
        expect(imgElement.nativeElement.height).toBe(100);
    });

    it('should display the first letter of altText in uppercase when imageUrl is not provided', () => {
        component.altText = 'user';
        fixture.detectChanges();

        const imgElement = fixture.debugElement.query(By.css('img.c-avatar__image'));
        expect(imgElement).toBeFalsy();

        const textElement = fixture.debugElement.query(By.css('.c-avatar'));
        expect(textElement.nativeElement.textContent.trim()).toBe('U');
    });

    it('should apply correct styles based on size input', () => {
        component.size = 80;
        fixture.detectChanges();

        const avatarElement = fixture.debugElement.query(By.css('.c-avatar'));
        expect(avatarElement.styles['width']).toBe('80px');
        expect(avatarElement.styles['height']).toBe('80px');
    });

    it('should update size dynamically', () => {
        component.size = 120;
        fixture.detectChanges();

        const avatarElement = fixture.debugElement.query(By.css('.c-avatar'));
        expect(avatarElement.styles['width']).toBe('120px');
        expect(avatarElement.styles['height']).toBe('120px');

        component.size = 180;
        fixture.detectChanges();
        expect(avatarElement.styles['width']).toBe('180px');
        expect(avatarElement.styles['height']).toBe('180px');
    });
});
