import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { InsuranceProviderService } from '../../insurance-provider.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  insuranceProviderId: string;
  providerName: string;
  contactPhone: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-insurance-provider-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ]
})
export class InsuranceProviderDeleteComponent {
  dialogRef = inject<MatDialogRef<InsuranceProviderDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  insuranceProviderService = inject(InsuranceProviderService);

  confirmDelete(): void {
    this.insuranceProviderService
      .deleteInsuranceProvider(this.data.insuranceProviderId)
      .subscribe({
        next: (response) => {
          this.dialogRef.close(response); // Close with the response data
          // Handle successful deletion, e.g., refresh the table or show a notification
        },
        error: (_error) => {
          // Handle the error appropriately
        },
      });
  }
}
