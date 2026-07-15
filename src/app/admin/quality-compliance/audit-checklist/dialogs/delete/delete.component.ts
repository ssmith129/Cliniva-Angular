import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AuditChecklistService } from '../../audit-checklist.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  audit_id: string;
  audit_type: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-audit-checklist-delete',
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
export class AuditChecklistDeleteComponent {
  dialogRef = inject<MatDialogRef<AuditChecklistDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  auditChecklistService = inject(AuditChecklistService);


  confirmDelete(): void {
    this.auditChecklistService.deleteAuditChecklist(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
