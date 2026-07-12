import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { VideoConsultationService } from '../../video-consultation.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  consultation_id: string;
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
export class VideoConsultationDeleteComponent {
  dialogRef = inject<MatDialogRef<VideoConsultationDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  videoConsultationService = inject(VideoConsultationService);


  confirmDelete(): void {
    this.videoConsultationService.deleteVideoConsultation(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
