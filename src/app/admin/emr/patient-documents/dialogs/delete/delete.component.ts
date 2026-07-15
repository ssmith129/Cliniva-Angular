import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PatientDocument } from '../../patient-documents.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-documents-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class PatientDocumentsDeleteComponent {
  dialogRef = inject<MatDialogRef<PatientDocumentsDeleteComponent>>(MatDialogRef);
  data = inject<PatientDocument>(MAT_DIALOG_DATA);


  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}