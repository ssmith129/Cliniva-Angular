import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PharmacyReportsService } from '../../pharmacy-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData { id: number; medicineName: string; category: string; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pharmacy-report-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class PharmacyReportDeleteComponent {
  dialogRef = inject<MatDialogRef<PharmacyReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  pharmacyReportsService = inject(PharmacyReportsService);

  confirmDelete(): void {
    this.pharmacyReportsService.deletePharmacyReport(this.data.id).subscribe({
      next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
    });
  }
}
