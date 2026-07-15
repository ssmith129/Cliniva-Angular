import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { Document } from '../../documents.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-document-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DocumentDeleteComponent {
  dialogRef = inject<MatDialogRef<DocumentDeleteComponent>>(MatDialogRef);
  data = inject<Document>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }
}
