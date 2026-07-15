import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PatientEncountersService } from '../../patient-encounters.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientEncounter } from '../../patient-encounters.model';
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
  patientEncounter: PatientEncounter;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-encounters-form',
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
export class PatientEncountersFormComponent {
  dialogRef = inject<MatDialogRef<PatientEncountersFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientEncountersService = inject(PatientEncountersService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  patientEncounterForm: FormGroup;
  patientEncounter: PatientEncounter;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.patientEncounter ? 
      data.patientEncounter.encounterId : 'New Encounter';
    this.patientEncounter = this.action === 'edit' && data.patientEncounter ? 
      data.patientEncounter : new PatientEncounter({});
    this.patientEncounterForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patientEncounter.id],
      encounterId: [this.patientEncounter.encounterId, [Validators.required]],
      patientName: [this.patientEncounter.patientName, [Validators.required]],
      doctorName: [this.patientEncounter.doctorName, [Validators.required]],
      encounterDate: [this.patientEncounter.encounterDate, [Validators.required]],
      encounterType: [this.patientEncounter.encounterType, [Validators.required]],
      department: [this.patientEncounter.department, [Validators.required]],
      diagnosis: [this.patientEncounter.diagnosis],
      status: [this.patientEncounter.status, [Validators.required]],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.patientEncounterForm.valid) {
      if (this.action === 'edit') {
        this.patientEncountersService.updatePatientEncounter(this.patientEncounterForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.patientEncountersService.addPatientEncounter(this.patientEncounterForm.getRawValue()).subscribe({
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
