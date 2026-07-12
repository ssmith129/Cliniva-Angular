import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { VirtualVisitRecordsService } from '../../virtual-visit-records.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  visit_id: string;
  patient_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-video-consultation-delete',
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
export class VirtualVisitRecordDeleteComponent {
  dialogRef = inject<MatDialogRef<VirtualVisitRecordDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  virtualVisitRecordsService = inject(VirtualVisitRecordsService);


  confirmDelete(): void {
    this.virtualVisitRecordsService.deleteRecord(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
