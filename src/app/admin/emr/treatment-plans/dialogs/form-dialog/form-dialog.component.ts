import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { TreatmentPlan } from '../../treatment-plans.model';
import { TreatmentPlansService } from '../../treatment-plans.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-treatment-plans-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule
],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class TreatmentPlansFormComponent implements OnInit {
  dialogRef = inject<MatDialogRef<TreatmentPlansFormComponent>>(MatDialogRef);
  data = inject<{
    treatmentPlan?: TreatmentPlan;
    action: 'add' | 'edit';
}>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private treatmentPlansService = inject(TreatmentPlansService);

  action: 'add' | 'edit';
  dialogTitle: string;
  treatmentPlanForm: FormGroup;
  treatmentPlan: TreatmentPlan;

  statusOptions = ['Active', 'Completed', 'On Hold', 'Discontinued'];

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'add' ? 'Add Treatment Plan' : 'Edit Treatment Plan';
    this.treatmentPlan = data.treatmentPlan || new TreatmentPlan({});
    this.treatmentPlanForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.action === 'edit' && this.treatmentPlan) {
      this.treatmentPlanForm.patchValue(this.treatmentPlan);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.treatmentPlan.id],
      patientName: [this.treatmentPlan.patientName, [Validators.required]],
      doctorName: [this.treatmentPlan.doctorName, [Validators.required]],
      diagnosis: [this.treatmentPlan.diagnosis, [Validators.required]],
      treatment: [this.treatmentPlan.treatment, [Validators.required]],
      startDate: [this.treatmentPlan.startDate, [Validators.required]],
      endDate: [this.treatmentPlan.endDate, [Validators.required]],
      status: [this.treatmentPlan.status, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.treatmentPlanForm.valid) {
      const formData = this.treatmentPlanForm.getRawValue();
      const treatmentPlan = new TreatmentPlan(formData);

      if (this.action === 'add') {
        this.treatmentPlansService.addTreatmentPlan(treatmentPlan).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      } else {
        this.treatmentPlansService.updateTreatmentPlan(treatmentPlan).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}