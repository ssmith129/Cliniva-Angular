import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TreatmentPlan } from '../../treatment-plans.model';
import { TreatmentPlansService } from '../../treatment-plans.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-treatment-plans-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class TreatmentPlansDeleteComponent {
  dialogRef = inject<MatDialogRef<TreatmentPlansDeleteComponent>>(MatDialogRef);
  data = inject<TreatmentPlan>(MAT_DIALOG_DATA);
  private treatmentPlansService = inject(TreatmentPlansService);


  confirmDelete(): void {
    this.treatmentPlansService.deleteTreatmentPlan(this.data.id).subscribe({
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
