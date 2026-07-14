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
  session: TelemedicineSession;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-telemedicine-form',
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
export class TelemedicineFormComponent {
  dialogRef = inject<MatDialogRef<TelemedicineFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  sessionForm: FormGroup;
  session: TelemedicineSession;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.session.sessionId;
      this.session = data.session;
    } else {
      this.dialogTitle = 'New Session';
      const blankObject = {} as TelemedicineSession;
      this.session = new TelemedicineSession(blankObject);
    }
    this.sessionForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.session.id],
      sessionId: [this.session.sessionId, [Validators.required]],
      patientName: [this.session.patientName, [Validators.required]],
      img: [this.session.img || 'assets/images/user/user1.jpg'],
      patientId: [this.session.patientId, [Validators.required]],
      scheduledDate: [this.session.scheduledDate, [Validators.required]],
      scheduledTime: [this.session.scheduledTime, [Validators.required]],
      duration: [this.session.duration, [Validators.required]],
      consultationType: [this.session.consultationType, [Validators.required]],
      status: [this.session.status, [Validators.required]],
      doctor: [this.session.doctor, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.sessionForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class TelemedicineSession {
  id: number;
  sessionId: string;
  patientName: string;
  img: string;
  patientId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  consultationType: string;
  status: string;
  doctor: string;

  constructor(session: TelemedicineSession) {
    {
      this.id = session.id || this.getRandomId();
      this.sessionId = session.sessionId || '';
      this.patientName = session.patientName || '';
      this.img = session.img || 'assets/images/user/user1.jpg';
      this.patientId = session.patientId || '';
      this.scheduledDate = session.scheduledDate || '';
      this.scheduledTime = session.scheduledTime || '';
      this.duration = session.duration || '';
      this.consultationType = session.consultationType || 'Video';
      this.status = session.status || 'Scheduled';
      this.doctor = session.doctor || '';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
