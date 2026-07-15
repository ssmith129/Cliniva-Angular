import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceClaim } from '../../insurance.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  claim: InsuranceClaim;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-insurance-claim-form',
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
export class InsuranceClaimFormComponent {
  dialogRef = inject<MatDialogRef<InsuranceClaimFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  claimForm: FormGroup;
  claim: InsuranceClaim;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = `Edit Claim ${data.claim.claimId}`;
      this.claim = data.claim;
    } else {
      this.dialogTitle = 'New Insurance Claim';
      const blankObject = {} as InsuranceClaim;
      this.claim = new InsuranceClaimClass(blankObject);
    }
    this.claimForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.claim.id],
      claimId: [this.claim.claimId, [Validators.required]],
      policyId: [this.claim.policyId, [Validators.required]],
      claimDate: [this.claim.claimDate, [Validators.required]],
      claimAmount: [this.claim.claimAmount, [Validators.required]],
      claimType: [this.claim.claimType, [Validators.required]],
      status: [this.claim.status, [Validators.required]],
      submittedDate: [this.claim.submittedDate, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.claimForm.valid) {
      this.dialogRef.close(this.claimForm.getRawValue());
    }
  }
}

export class InsuranceClaimClass {
  id: number;
  claimId: string;
  policyId: string;
  claimDate: string;
  claimAmount: number;
  claimType: string;
  status: string;
  submittedDate: string;

  constructor(claim: InsuranceClaim) {
    this.id = claim.id || 0;
    this.claimId = claim.claimId || '';
    this.policyId = claim.policyId || '';
    this.claimDate = claim.claimDate || '';
    this.claimAmount = claim.claimAmount || 0;
    this.claimType = claim.claimType || '';
    this.status = claim.status || 'Pending';
    this.submittedDate = claim.submittedDate || '';
  }
}
