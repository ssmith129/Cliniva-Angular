import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MedicationHistory } from '../../medication-history.model';
import { MedicationHistoryService } from '../../medication-history.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-medication-history-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class MedicationHistoryDeleteComponent {
  dialogRef = inject<MatDialogRef<MedicationHistoryDeleteComponent>>(MatDialogRef);
  data = inject<MedicationHistory>(MAT_DIALOG_DATA);
  private medicationHistoryService = inject(MedicationHistoryService);


  confirmDelete(): void {
    this.medicationHistoryService
      .deleteMedicationHistory(this.data.id)
      .subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (_error) => {
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
