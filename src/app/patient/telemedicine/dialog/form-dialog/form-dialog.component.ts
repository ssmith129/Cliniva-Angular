import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelemedicineSession } from '../../telemedicine.model';
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
      this.dialogTitle = `Edit Session with ${data.session.doctorName}`;
      this.session = data.session;
    } else {
      this.dialogTitle = 'New Telemedicine Session';
      const blankObject = {} as TelemedicineSession;
      this.session = new TelemedicineSessionClass(blankObject);
    }
    this.sessionForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.session.id],
      sessionId: [this.session.sessionId, [Validators.required]],
      doctorName: [this.session.doctorName, [Validators.required]],
      img: [this.session.img],
      specialty: [this.session.specialty, [Validators.required]],
      scheduledDate: [this.session.scheduledDate, [Validators.required]],
      scheduledTime: [this.session.scheduledTime, [Validators.required]],
      duration: [this.session.duration, [Validators.required]],
      consultationType: [this.session.consultationType, [Validators.required]],
      status: [this.session.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.sessionForm.valid) {
      this.dialogRef.close(this.sessionForm.getRawValue());
    }
  }
}

export class TelemedicineSessionClass {
  id: number;
  sessionId: string;
  doctorName: string;
  img: string;
  specialty: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  consultationType: string;
  status: string;

  constructor(session: TelemedicineSession) {
    this.id = session.id || 0;
    this.sessionId = session.sessionId || '';
    this.doctorName = session.doctorName || '';
    this.img = session.img || 'assets/images/user/user1.jpg';
    this.specialty = session.specialty || '';
    this.scheduledDate = session.scheduledDate || '';
    this.scheduledTime = session.scheduledTime || '';
    this.duration = session.duration || '';
    this.consultationType = session.consultationType || 'Video Call';
    this.status = session.status || 'Scheduled';
  }
}
