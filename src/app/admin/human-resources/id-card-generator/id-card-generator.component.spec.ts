import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardGeneratorComponent } from './id-card-generator.component';

describe('IdCardGeneratorComponent', () => {
  let component: IdCardGeneratorComponent;
  let fixture: ComponentFixture<IdCardGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdCardGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdCardGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
