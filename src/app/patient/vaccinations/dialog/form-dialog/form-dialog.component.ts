import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vaccination } from '../../vaccinations.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  vaccination: Vaccination;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vaccination-form',
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
    MatDatepickerModule,
    MatDialogClose
],
})
export class VaccinationFormComponent {
  dialogRef = inject<MatDialogRef<VaccinationFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  vaccinationForm: FormGroup;
  vaccination: Vaccination;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.vaccination.vaccineName;
      this.vaccination = data.vaccination;
    } else {
      this.dialogTitle = 'New Vaccination Record';
      const blankObject = {} as Vaccination;
      this.vaccination = new VaccinationClass(blankObject);
    }
    this.vaccinationForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.vaccination.id],
      vaccineId: [this.vaccination.vaccineId, [Validators.required]],
      vaccineName: [this.vaccination.vaccineName, [Validators.required]],
      vaccineType: [this.vaccination.vaccineType, [Validators.required]],
      administeredDate: [this.vaccination.administeredDate],
      nextDueDate: [this.vaccination.nextDueDate],
      administeredBy: [this.vaccination.administeredBy, [Validators.required]],
      batchNumber: [this.vaccination.batchNumber, [Validators.required]],
      site: [this.vaccination.site, [Validators.required]],
      status: [this.vaccination.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.vaccinationForm.valid) {
      this.dialogRef.close(this.vaccinationForm.getRawValue());
    }
  }
}

export class VaccinationClass {
  id: number;
  vaccineId: string;
  vaccineName: string;
  vaccineType: string;
  administeredDate: string;
  nextDueDate: string;
  administeredBy: string;
  batchNumber: string;
  site: string;
  status: string;

  constructor(vaccination: Vaccination) {
    this.id = vaccination.id || 0;
    this.vaccineId = vaccination.vaccineId || '';
    this.vaccineName = vaccination.vaccineName || '';
    this.vaccineType = vaccination.vaccineType || '';
    this.administeredDate = vaccination.administeredDate || '';
    this.nextDueDate = vaccination.nextDueDate || '';
    this.administeredBy = vaccination.administeredBy || '';
    this.batchNumber = vaccination.batchNumber || '';
    this.site = vaccination.site || '';
    this.status = vaccination.status || 'Scheduled';
  }
}
