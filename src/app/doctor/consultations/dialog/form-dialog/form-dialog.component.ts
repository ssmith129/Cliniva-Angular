import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  consultation: Consultation;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consultation-form',
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
export class ConsultationFormComponent {
  dialogRef = inject<MatDialogRef<ConsultationFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  consultationForm: FormGroup;
  consultation: Consultation;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.consultation.consultationId;
      this.consultation = data.consultation;
    } else {
      this.dialogTitle = 'New Consultation';
      const blankObject = {} as Consultation;
      this.consultation = new Consultation(blankObject);
    }
    this.consultationForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.consultation.id],
      consultationId: [this.consultation.consultationId, [Validators.required]],
      patientName: [this.consultation.patientName, [Validators.required]],
      img: [this.consultation.img || 'assets/images/user/user1.jpg'],
      patientId: [this.consultation.patientId, [Validators.required]],
      consultationDate: [
        this.consultation.consultationDate,
        [Validators.required],
      ],
      consultationTime: [
        this.consultation.consultationTime,
        [Validators.required],
      ],
      chiefComplaint: [this.consultation.chiefComplaint, [Validators.required]],
      diagnosis: [this.consultation.diagnosis, [Validators.required]],
      doctor: [this.consultation.doctor, [Validators.required]],
      status: [this.consultation.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.consultationForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Consultation {
  id: number;
  consultationId: string;
  patientName: string;
  img: string;
  patientId: string;
  consultationDate: string;
  consultationTime: string;
  chiefComplaint: string;
  diagnosis: string;
  doctor: string;
  status: string;

  constructor(consultation: Consultation) {
    {
      this.id = consultation.id || this.getRandomId();
      this.consultationId = consultation.consultationId || '';
      this.patientName = consultation.patientName || '';
      this.img = consultation.img || 'assets/images/user/user1.jpg';
      this.patientId = consultation.patientId || '';
      this.consultationDate = consultation.consultationDate || '';
      this.consultationTime = consultation.consultationTime || '';
      this.chiefComplaint = consultation.chiefComplaint || '';
      this.diagnosis = consultation.diagnosis || '';
      this.doctor = consultation.doctor || '';
      this.status = consultation.status || 'Scheduled';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
