import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ConsentTemplatesService } from '../../consent-templates.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  template_id: string;
  template_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consent-templates-delete',
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
export class ConsentTemplatesDeleteComponent {
  dialogRef = inject<MatDialogRef<ConsentTemplatesDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  consentTemplatesService = inject(ConsentTemplatesService);


  confirmDelete(): void {
    this.consentTemplatesService.deleteConsentTemplate(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
