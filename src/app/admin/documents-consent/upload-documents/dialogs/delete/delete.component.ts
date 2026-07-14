import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { UploadDocumentsService } from '../../upload-documents.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  document_id: string;
  document_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-upload-documents-delete',
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
export class UploadDocumentsDeleteComponent {
  dialogRef = inject<MatDialogRef<UploadDocumentsDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  uploadDocumentsService = inject(UploadDocumentsService);


  confirmDelete(): void {
    this.uploadDocumentsService.deleteUploadDocument(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
