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
  billing: Billing;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-billing-form',
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
export class BillingFormComponent {
  dialogRef = inject<MatDialogRef<BillingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  billingForm: FormGroup;
  billing: Billing;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.billing.invoiceId;
      this.billing = data.billing;
    } else {
      this.dialogTitle = 'New Billing Record';
      const blankObject = {} as Billing;
      this.billing = new Billing(blankObject);
    }
    this.billingForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.billing.id],
      invoiceId: [this.billing.invoiceId, [Validators.required]],
      patientName: [this.billing.patientName, [Validators.required]],
      img: [this.billing.img || 'assets/images/user/user1.jpg'],
      patientId: [this.billing.patientId, [Validators.required]],
      consultationDate: [this.billing.consultationDate, [Validators.required]],
      serviceType: [this.billing.serviceType, [Validators.required]],
      amount: [this.billing.amount, [Validators.required]],
      paymentStatus: [this.billing.paymentStatus, [Validators.required]],
      paymentMethod: [this.billing.paymentMethod],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.billingForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Billing {
  id: number;
  invoiceId: string;
  patientName: string;
  img: string;
  patientId: string;
  consultationDate: string;
  serviceType: string;
  amount: number;
  paymentStatus: string;
  paymentMethod?: string;
  paymentDate?: string;

  constructor(billing: Billing) {
    {
      this.id = billing.id || this.getRandomId();
      this.invoiceId = billing.invoiceId || '';
      this.patientName = billing.patientName || '';
      this.img = billing.img || 'assets/images/user/user1.jpg';
      this.patientId = billing.patientId || '';
      this.consultationDate = billing.consultationDate || '';
      this.serviceType = billing.serviceType || '';
      this.amount = billing.amount || 0;
      this.paymentStatus = billing.paymentStatus || '';
      this.paymentMethod = billing.paymentMethod || '';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
