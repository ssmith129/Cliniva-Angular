import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { InsuranceProviderService } from '../../insurance-provider.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InsuranceProvider } from '../../insurance-provider.model';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  id: number;
  action: string;
  insuranceProvider: InsuranceProvider;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-insurance-provider-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
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
    ]
})
export class AllInsuranceProviderFormComponent {
  dialogRef = inject<MatDialogRef<AllInsuranceProviderFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  insuranceProviderService = inject(InsuranceProviderService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  insuranceProviderForm: FormGroup;
  insuranceProvider: InsuranceProvider;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit'
        ? data.insuranceProvider.providerName
        : 'New Providar';
    this.insuranceProvider =
      this.action === 'edit'
        ? data.insuranceProvider
        : new InsuranceProvider({}); // Create a blank object
    this.insuranceProviderForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      insuranceProviderId: [
        this.insuranceProvider.insuranceProviderId,
        [Validators.required],
      ],
      providerName: [
        this.insuranceProvider.providerName,
        [Validators.required],
      ],
      providerCode: [
        this.insuranceProvider.providerCode,
        [Validators.required],
      ],
      contactPhone: [
        this.insuranceProvider.contactPhone,
        [Validators.required],
      ],
      contactEmail: [
        this.insuranceProvider.contactEmail,
        [Validators.required, Validators.email],
      ],
      address: [this.insuranceProvider.address, [Validators.required]],
      websiteUrl: [this.insuranceProvider.websiteUrl, [Validators.required]],
      customerSupportNumber: [
        this.insuranceProvider.customerSupportNumber,
        [Validators.required],
      ],
      paymentTerms: [
        this.insuranceProvider.paymentTerms,
        [Validators.required],
      ],
      contractStartDate: [
        this.insuranceProvider.contractStartDate,
        [Validators.required],
      ],
      contractEndDate: [
        this.insuranceProvider.contractEndDate,
        [Validators.required],
      ],
      reimbursementRate: [
        this.insuranceProvider.reimbursementRate,
        [Validators.required],
      ],
      coverageTypes: [
        this.insuranceProvider.coverageTypes,
        [Validators.required],
      ],
      status: [this.insuranceProvider.status, [Validators.required]],
      contractNotes: [this.insuranceProvider.contractNotes],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  submit() {
    if (this.insuranceProviderForm.valid) {
      if (this.action === 'edit') {
        // Update existing doctor
        this.insuranceProviderService
          .updateInsuranceProvider(this.insuranceProviderForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return updated doctor data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      } else {
        // Add new doctor
        this.insuranceProviderService
          .addInsuranceProvider(this.insuranceProviderForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return newly added doctor data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
