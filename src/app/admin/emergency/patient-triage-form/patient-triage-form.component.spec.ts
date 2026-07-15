import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTriageFormComponent } from './patient-triage-form.component';

describe('PatientTriageFormComponent', () => {
  let component: PatientTriageFormComponent;
  let fixture: ComponentFixture<PatientTriageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTriageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTriageFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
