import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { SignedConsentService } from '../../signed-consent.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignedConsent } from '../../signed-consent.model';
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
  signedConsent: SignedConsent;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signed-consent-form',
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
    MatDialogClose
],
})
export class SignedConsentFormComponent {
  dialogRef = inject<MatDialogRef<SignedConsentFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  signedConsentService = inject(SignedConsentService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  signedConsentForm: FormGroup;
  signedConsent: SignedConsent;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.signedConsent ? 
      data.signedConsent.consent_id : 'New Signed Consent';
    this.signedConsent = this.action === 'edit' && data.signedConsent ? 
      data.signedConsent : new SignedConsent({});
    this.signedConsentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.signedConsent.id],
      consent_id: [this.signedConsent.consent_id, [Validators.required]],
      patient_name: [this.signedConsent.patient_name, [Validators.required]],
      consent_type: [this.signedConsent.consent_type, [Validators.required]],
      procedure_name: [this.signedConsent.procedure_name, [Validators.required]],
      signed_date: [this.signedConsent.signed_date, [Validators.required]],
      signed_time: [this.signedConsent.signed_time],
      signed_by: [this.signedConsent.signed_by],
      relationship: [this.signedConsent.relationship],
      witness_name: [this.signedConsent.witness_name],
      witness_designation: [this.signedConsent.witness_designation],
      expiry_date: [this.signedConsent.expiry_date],
      status: [this.signedConsent.status, [Validators.required]],
      notes: [this.signedConsent.notes],
    });
  }

  submit() {
    if (this.signedConsentForm.valid) {
      if (this.action === 'edit') {
        this.signedConsentService.updateSignedConsent(this.signedConsentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.signedConsentService.addSignedConsent(this.signedConsentForm.getRawValue()).subscribe({
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
