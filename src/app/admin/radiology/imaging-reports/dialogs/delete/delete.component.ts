import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ImagingReportsService } from '../../imaging-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  reportId: string;
  patientName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-imaging-reports-delete',
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
export class ImagingReportsDeleteComponent {
  dialogRef = inject<MatDialogRef<ImagingReportsDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  imagingReportsService = inject(ImagingReportsService);


  confirmDelete(): void {
    this.imagingReportsService.deleteImagingReport(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
