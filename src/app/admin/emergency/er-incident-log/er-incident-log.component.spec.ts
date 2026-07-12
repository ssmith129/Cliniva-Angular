import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErIncidentLogComponent } from './er-incident-log.component';

describe('ErIncidentLogComponent', () => {
  let component: ErIncidentLogComponent;
  let fixture: ComponentFixture<ErIncidentLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErIncidentLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErIncidentLogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
