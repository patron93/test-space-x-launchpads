import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchpadListInfoComponent } from './launchpad-list-info.component';
import { LaunchpadDto } from '../../../core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('LaunchpadListInfoComponent', () => {
    let component: LaunchpadListInfoComponent;
    let fixture: ComponentFixture<LaunchpadListInfoComponent>;

    const mockLaunchpad: LaunchpadDto = {
        id: '1',
        name: 'Test Launchpad',
        details: 'Some details about the launchpad.',
        locality: 'Test Locality',
        region: 'Test Region',
        images: {
            large: ['https://example.com/image.jpg']
        },
        launches: [
            {
                id: 'launch1',
                name: 'Launch 1',
                date_utc: '2023-06-18T00:00:00Z',
            },
            {
                id: 'launch2',
                name: 'Launch 2',
                date_utc: '2023-07-18T00:00:00Z',
            }
        ],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatListModule, MatDividerModule, LaunchpadListInfoComponent],
            providers: [DatePipe]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LaunchpadListInfoComponent);
        component = fixture.componentInstance;
        component.launchpad = mockLaunchpad;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display launchpad details', () => {
        const detailsElement = fixture.debugElement.query(By.css('.c-launchpad-list-info__details'));
        expect(detailsElement.nativeElement.textContent).toContain(mockLaunchpad.details);
    });

    it('should display the correct number of launches', () => {
        const launchItems = fixture.debugElement.queryAll(By.css('.c-launchpad-list-info__list-item'));
        expect(launchItems.length).toBe(mockLaunchpad.launches.length);
    });

    it('should display each launch name and date', () => {
        const launchItems = fixture.debugElement.queryAll(By.css('.c-launchpad-list-info__list-item'));
        launchItems.forEach((item, index) => {
            const launch = mockLaunchpad.launches[index];
            const nameElement = item.query(By.css('span:first-child'));
            const dateElement = item.query(By.css('span:last-child'));
            expect(nameElement.nativeElement.textContent).toBe(launch.name);
            const expectedDate = new DatePipe('en-US').transform(launch.date_utc, 'medium');
            expect(dateElement.nativeElement.textContent).toBe(expectedDate);
        });
    });

    it('should display dividers between launches except after the last launch', () => {
        const dividers = fixture.debugElement.queryAll(By.css('mat-divider'));
        expect(dividers.length).toBe(mockLaunchpad.launches.length - 1);
    });
});

