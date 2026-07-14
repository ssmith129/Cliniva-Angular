import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { DisposalLogsService } from '../../disposal-logs.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  disposal_id: string;
  waste_type: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-disposal-log-delete',
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
export class DisposalLogDeleteComponent {
  dialogRef = inject<MatDialogRef<DisposalLogDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  disposalLogsService = inject(DisposalLogsService);


  confirmDelete(): void {
    this.disposalLogsService.deleteDisposalLog(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
