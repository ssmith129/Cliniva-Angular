import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErBedTrackerComponent } from './er-bed-tracker.component';

describe('ErBedTrackerComponent', () => {
  let component: ErBedTrackerComponent;
  let fixture: ComponentFixture<ErBedTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErBedTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErBedTrackerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
