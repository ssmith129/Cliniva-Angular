import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MedicationHistory } from '../../medication-history.model';
import { MedicationHistoryService } from '../../medication-history.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-medication-history-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatOptionModule],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class MedicationHistoryFormComponent {
  dialogRef = inject<MatDialogRef<MedicationHistoryFormComponent>>(MatDialogRef);
  data = inject<{
    medicationHistory?: MedicationHistory;
    action: 'add' | 'edit';
}>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private medicationHistoryService = inject(MedicationHistoryService);

  action: 'add' | 'edit';
  dialogTitle: string;
  medicationHistoryForm: FormGroup;
  medicationHistory: MedicationHistory;
  statusOptions = ['Active', 'Completed', 'Discontinued'];

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'add' ? 'Add Medication History' : 'Edit Medication History';
    this.medicationHistory = data.medicationHistory || new MedicationHistory({});
    this.medicationHistoryForm = this.createForm();
    if (this.action === 'edit' && this.medicationHistory) {
      this.medicationHistoryForm.patchValue(this.medicationHistory);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.medicationHistory.id],
      medicationId: [this.medicationHistory.medicationId, [Validators.required]],
      patientName: [this.medicationHistory.patientName, [Validators.required]],
      drugName: [this.medicationHistory.drugName, [Validators.required]],
      dosage: [this.medicationHistory.dosage, [Validators.required]],
      frequency: [this.medicationHistory.frequency, [Validators.required]],
      prescribedBy: [this.medicationHistory.prescribedBy, [Validators.required]],
      startDate: [this.medicationHistory.startDate, [Validators.required]],
      endDate: [this.medicationHistory.endDate, [Validators.required]],
      status: [this.medicationHistory.status, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.medicationHistoryForm.valid) {
      const formData = this.medicationHistoryForm.getRawValue();
      const medicationHistory = new MedicationHistory(formData);
      if (this.action === 'add') {
        this.medicationHistoryService.addMedicationHistory(medicationHistory).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      } else {
        this.medicationHistoryService.updateMedicationHistory(medicationHistory).subscribe({
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
