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
  surgery: Surgery;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-surgery-form',
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
export class SurgeryFormComponent {
  dialogRef = inject<MatDialogRef<SurgeryFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  surgeryForm: FormGroup;
  surgery: Surgery;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.surgery.surgeryId;
      this.surgery = data.surgery;
    } else {
      this.dialogTitle = 'New Surgery';
      const blankObject = {} as Surgery;
      this.surgery = new Surgery(blankObject);
    }
    this.surgeryForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.surgery.id],
      surgeryId: [this.surgery.surgeryId, [Validators.required]],
      patientName: [this.surgery.patientName, [Validators.required]],
      img: [this.surgery.img || 'assets/images/user/user1.jpg'],
      patientId: [this.surgery.patientId, [Validators.required]],
      procedureName: [this.surgery.procedureName, [Validators.required]],
      surgeryDate: [this.surgery.surgeryDate, [Validators.required]],
      surgeryTime: [this.surgery.surgeryTime, [Validators.required]],
      surgeon: [this.surgery.surgeon, [Validators.required]],
      operatingRoom: [this.surgery.operatingRoom, [Validators.required]],
      priority: [this.surgery.priority, [Validators.required]],
      status: [this.surgery.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.surgeryForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Surgery {
  id: number;
  surgeryId: string;
  patientName: string;
  img: string;
  patientId: string;
  procedureName: string;
  surgeryDate: string;
  surgeryTime: string;
  surgeon: string;
  operatingRoom: string;
  priority: string;
  status: string;

  constructor(surgery: Surgery) {
    {
      this.id = surgery.id || this.getRandomId();
      this.surgeryId = surgery.surgeryId || '';
      this.patientName = surgery.patientName || '';
      this.img = surgery.img || 'assets/images/user/user1.jpg';
      this.patientId = surgery.patientId || '';
      this.procedureName = surgery.procedureName || '';
      this.surgeryDate = surgery.surgeryDate || '';
      this.surgeryTime = surgery.surgeryTime || '';
      this.surgeon = surgery.surgeon || '';
      this.operatingRoom = surgery.operatingRoom || '';
      this.priority = surgery.priority || 'Routine';
      this.status = surgery.status || 'Scheduled';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
