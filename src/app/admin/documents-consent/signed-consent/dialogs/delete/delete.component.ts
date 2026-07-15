import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { SignedConsentService } from '../../signed-consent.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  consent_id: string;
  patient_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signed-consent-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ]
})
export class SignedConsentDeleteComponent {
  dialogRef = inject<MatDialogRef<SignedConsentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  signedConsentService = inject(SignedConsentService);


  confirmDelete(): void {
    this.signedConsentService.deleteSignedConsent(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
