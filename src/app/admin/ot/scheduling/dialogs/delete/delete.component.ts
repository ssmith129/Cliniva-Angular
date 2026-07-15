import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { OTSchedulingService } from '../../scheduling.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  scheduleId: string;
  patientName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ot-scheduling-delete',
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
export class OTSchedulingDeleteComponent {
  dialogRef = inject<MatDialogRef<OTSchedulingDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  otSchedulingService = inject(OTSchedulingService);


  confirmDelete(): void {
    this.otSchedulingService.deleteOTSchedule(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
