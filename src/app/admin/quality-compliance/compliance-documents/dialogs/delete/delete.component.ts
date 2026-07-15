import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ComplianceDocumentsService } from '../../compliance-documents.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  document_id: string;
  document_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-compliance-document-delete',
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
export class ComplianceDocumentDeleteComponent {
  dialogRef = inject<MatDialogRef<ComplianceDocumentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  complianceDocumentsService = inject(ComplianceDocumentsService);


  confirmDelete(): void {
    this.complianceDocumentsService.deleteComplianceDocument(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
