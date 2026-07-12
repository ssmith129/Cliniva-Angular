import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PreOpAssessmentService } from '../../pre-op-assessment.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreOpAssessment } from '../../pre-op-assessment.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  id: number;
  action: string;
  preOpAssessment: PreOpAssessment;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pre-op-assessment-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
})
export class PreOpAssessmentFormComponent {
  dialogRef = inject<MatDialogRef<PreOpAssessmentFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  preOpAssessmentService = inject(PreOpAssessmentService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  preOpAssessmentForm: FormGroup;
  preOpAssessment: PreOpAssessment;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.preOpAssessment ? 
      data.preOpAssessment.assessmentId : 'New Pre-Op Assessment';
    this.preOpAssessment = this.action === 'edit' && data.preOpAssessment ? 
      data.preOpAssessment : new PreOpAssessment({});
    this.preOpAssessmentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.preOpAssessment.id],
      assessmentId: [this.preOpAssessment.assessmentId, [Validators.required]],
      patientName: [this.preOpAssessment.patientName, [Validators.required]],
      surgeryType: [this.preOpAssessment.surgeryType, [Validators.required]],
      assessmentDate: [this.preOpAssessment.assessmentDate, [Validators.required]],
      assessedBy: [this.preOpAssessment.assessedBy, [Validators.required]],
      vitalSigns: [this.preOpAssessment.vitalSigns, [Validators.required]],
      medicalHistory: [this.preOpAssessment.medicalHistory, [Validators.required]],
      currentMedications: [this.preOpAssessment.currentMedications],
      allergies: [this.preOpAssessment.allergies],
      fitnessStatus: [this.preOpAssessment.fitnessStatus, [Validators.required]],
      riskLevel: [this.preOpAssessment.riskLevel, [Validators.required]],
      recommendations: [this.preOpAssessment.recommendations],
      notes: [this.preOpAssessment.notes],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.preOpAssessmentForm.valid) {
      if (this.action === 'edit') {
        this.preOpAssessmentService.updatePreOpAssessment(this.preOpAssessmentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.preOpAssessmentService.addPreOpAssessment(this.preOpAssessmentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
