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
  referral: Referral;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-referral-form',
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
export class ReferralFormComponent {
  dialogRef = inject<MatDialogRef<ReferralFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  referralForm: FormGroup;
  referral: Referral;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.referral.referralId;
      this.referral = data.referral;
    } else {
      this.dialogTitle = 'New Referral';
      const blankObject = {} as Referral;
      this.referral = new Referral(blankObject);
    }
    this.referralForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.referral.id],
      referralId: [this.referral.referralId, [Validators.required]],
      patientName: [this.referral.patientName, [Validators.required]],
      img: [this.referral.img || 'assets/images/user/user1.jpg'],
      patientId: [this.referral.patientId, [Validators.required]],
      referredTo: [this.referral.referredTo, [Validators.required]],
      specialty: [this.referral.specialty, [Validators.required]],
      referralDate: [this.referral.referralDate, [Validators.required]],
      reason: [this.referral.reason, [Validators.required]],
      status: [this.referral.status, [Validators.required]],
      priority: [this.referral.priority, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.referralForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Referral {
  id: number;
  referralId: string;
  patientName: string;
  img: string;
  patientId: string;
  referredTo: string;
  specialty: string;
  referralDate: string;
  reason: string;
  status: string;
  priority: string;

  constructor(referral: Referral) {
    {
      this.id = referral.id || this.getRandomId();
      this.referralId = referral.referralId || '';
      this.patientName = referral.patientName || '';
      this.img = referral.img || 'assets/images/user/user1.jpg';
      this.patientId = referral.patientId || '';
      this.referredTo = referral.referredTo || '';
      this.specialty = referral.specialty || '';
      this.referralDate = referral.referralDate || '';
      this.reason = referral.reason || '';
      this.status = referral.status || 'Pending';
      this.priority = referral.priority || 'Routine';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
