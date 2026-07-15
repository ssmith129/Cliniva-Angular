import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { VisitLogsService } from '../../visit-logs.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  visitorName: string;
  visitorPhone: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-visit-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class VisitDeleteComponent {
  dialogRef = inject<MatDialogRef<VisitDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  visitLogsService = inject(VisitLogsService);


  confirmDelete(): void {
    this.visitLogsService.deleteVisit(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
