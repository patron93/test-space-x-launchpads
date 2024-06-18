import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchpadListHeaderComponent } from './launchpad-list-header.component';
import { AvatarComponent } from '../../../shared';
import { MatIconModule } from '@angular/material/icon';
import { LaunchpadDto } from '../../../core';
import { By } from '@angular/platform-browser';

describe('LaunchpadListHeaderComponent', () => {
    let component: LaunchpadListHeaderComponent;
    let fixture: ComponentFixture<LaunchpadListHeaderComponent>;

    const mockLaunchpad: LaunchpadDto = {
        id: '1',
        name: 'Test Launchpad',
        locality: 'Test Locality',
        region: 'Test Region',
        images: {
            large: ['https://example.com/image.jpg']
        },
        details: 'test details',
        launches: [],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconModule, LaunchpadListHeaderComponent, AvatarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LaunchpadListHeaderComponent);
        component = fixture.componentInstance;
        component.launchpad = mockLaunchpad;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display launchpad name', () => {
        const nameElement = fixture.debugElement.query(By.css('.c-launchpad-list-header__name'));
        expect(nameElement.nativeElement.textContent).toContain(mockLaunchpad.name);
    });

    it('should display avatar with correct imageUrl and altText', () => {
        const avatarComponent = fixture.debugElement.query(By.directive(AvatarComponent));
        expect(avatarComponent).toBeTruthy();
        expect(avatarComponent.componentInstance.imageUrl).toBe(mockLaunchpad.images.large[0]);
        expect(avatarComponent.componentInstance.altText).toBe(mockLaunchpad.name);
    });

    it('should display locality and region', () => {
        const locationElement = fixture.debugElement.query(By.css('.c-launchpad-list-header__location'));
        expect(locationElement.nativeElement.textContent).toContain(mockLaunchpad.locality);
        expect(locationElement.nativeElement.textContent).toContain(mockLaunchpad.region);
    });

    it('should display location icon', () => {
        const iconElement = fixture.debugElement.query(By.css('.c-launchpad-list-header__location mat-icon'));
        expect(iconElement).toBeTruthy();
        expect(iconElement.attributes['data-mat-icon-name']).toBe('location_on');
    });
});
