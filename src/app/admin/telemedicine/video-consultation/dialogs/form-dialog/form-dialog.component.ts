import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { VideoConsultationService } from '../../video-consultation.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoConsultation } from '../../video-consultation.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  videoConsultation: VideoConsultation;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-video-consultation-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose
],
})
export class VideoConsultationFormComponent {
  dialogRef = inject<MatDialogRef<VideoConsultationFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  videoConsultationService = inject(VideoConsultationService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  consultationForm: FormGroup;
  videoConsultation: VideoConsultation;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.videoConsultation ? 
      data.videoConsultation.consultation_id : 'New Consultation';
    this.videoConsultation = this.action === 'edit' && data.videoConsultation ? 
      data.videoConsultation : new VideoConsultation({});
    this.consultationForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.videoConsultation.id],
      consultation_id: [this.videoConsultation.consultation_id, [Validators.required]],
      patient_name: [this.videoConsultation.patient_name, [Validators.required]],
      doctor_name: [this.videoConsultation.doctor_name, [Validators.required]],
      scheduled_date: [this.videoConsultation.scheduled_date, [Validators.required]],
      scheduled_time: [this.videoConsultation.scheduled_time, [Validators.required]],
      duration: [this.videoConsultation.duration],
      status: [this.videoConsultation.status, [Validators.required]],
      meeting_link: [this.videoConsultation.meeting_link],
      notes: [this.videoConsultation.notes],
    });
  }

  submit() {
    if (this.consultationForm.valid) {
      if (this.action === 'edit') {
        this.videoConsultationService.updateVideoConsultation(this.consultationForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.videoConsultationService.addVideoConsultation(this.consultationForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
