import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErDashboardComponent } from './er-dashboard.component';

describe('ErDashboardComponent', () => {
  let component: ErDashboardComponent;
  let fixture: ComponentFixture<ErDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
