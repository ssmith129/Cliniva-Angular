import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PreOpAssessmentService } from '../../pre-op-assessment.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  assessmentId: string;
  patientName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pre-op-assessment-delete',
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
export class PreOpAssessmentDeleteComponent {
  dialogRef = inject<MatDialogRef<PreOpAssessmentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  preOpAssessmentService = inject(PreOpAssessmentService);


  confirmDelete(): void {
    this.preOpAssessmentService.deletePreOpAssessment(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
