import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmergencyRequest } from '../../emergency.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  request: EmergencyRequest;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emergency-form',
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
export class EmergencyFormComponent {
  dialogRef = inject<MatDialogRef<EmergencyFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  emergencyForm: FormGroup;
  request: EmergencyRequest;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = `Edit ${data.request.requestId}`;
      this.request = data.request;
    } else {
      this.dialogTitle = 'New Emergency Request';
      const blankObject = {} as EmergencyRequest;
      this.request = new EmergencyRequestClass(blankObject);
    }
    this.emergencyForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.request.id],
      requestId: [this.request.requestId, [Validators.required]],
      type: [this.request.type, [Validators.required]],
      date: [this.request.date, [Validators.required]],
      time: [this.request.time, [Validators.required]],
      status: [this.request.status, [Validators.required]],
      location: [this.request.location, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.emergencyForm.valid) {
      this.dialogRef.close(this.emergencyForm.getRawValue());
    }
  }
}

export class EmergencyRequestClass {
  id: number;
  requestId: string;
  type: string;
  date: string;
  time: string;
  status: string;
  location: string;

  constructor(request: EmergencyRequest) {
    this.id = request.id || 0;
    this.requestId = request.requestId || '';
    this.type = request.type || '';
    this.date = request.date || '';
    this.time = request.time || '';
    this.status = request.status || 'Pending';
    this.location = request.location || '';
  }
}
