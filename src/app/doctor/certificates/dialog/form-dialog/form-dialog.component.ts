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
  certificate: Certificate;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-certificate-form',
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
export class CertificateFormComponent {
  dialogRef = inject<MatDialogRef<CertificateFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  certificateForm: FormGroup;
  certificate: Certificate;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.certificate.certificateId;
      this.certificate = data.certificate;
    } else {
      this.dialogTitle = 'New Certificate';
      const blankObject = {} as Certificate;
      this.certificate = new Certificate(blankObject);
    }
    this.certificateForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.certificate.id],
      certificateId: [this.certificate.certificateId, [Validators.required]],
      patientName: [this.certificate.patientName, [Validators.required]],
      img: [this.certificate.img || 'assets/images/user/user1.jpg'],
      patientId: [this.certificate.patientId, [Validators.required]],
      certificateType: [
        this.certificate.certificateType,
        [Validators.required],
      ],
      issueDate: [this.certificate.issueDate, [Validators.required]],
      validUntil: [this.certificate.validUntil],
      purpose: [this.certificate.purpose, [Validators.required]],
      issuedBy: [this.certificate.issuedBy, [Validators.required]],
      status: [this.certificate.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.certificateForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Certificate {
  id: number;
  certificateId: string;
  patientName: string;
  img: string;
  patientId: string;
  certificateType: string;
  issueDate: string;
  validUntil?: string;
  purpose: string;
  issuedBy: string;
  status: string;

  constructor(certificate: Certificate) {
    {
      this.id = certificate.id || this.getRandomId();
      this.certificateId = certificate.certificateId || '';
      this.patientName = certificate.patientName || '';
      this.img = certificate.img || 'assets/images/user/user1.jpg';
      this.patientId = certificate.patientId || '';
      this.certificateType = certificate.certificateType || '';
      this.issueDate = certificate.issueDate || '';
      this.validUntil = certificate.validUntil || '';
      this.purpose = certificate.purpose || '';
      this.issuedBy = certificate.issuedBy || '';
      this.status = certificate.status || 'Issued';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
