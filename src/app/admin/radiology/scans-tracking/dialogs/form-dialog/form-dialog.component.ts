import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ScansTrackingService } from '../../scans-tracking.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScanTracking } from '../../scans-tracking.model';
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
  scanTracking: ScanTracking;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-scans-tracking-form',
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
export class ScansTrackingFormComponent {
  dialogRef = inject<MatDialogRef<ScansTrackingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  scansTrackingService = inject(ScansTrackingService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  scanTrackingForm: FormGroup;
  scanTracking: ScanTracking;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.scanTracking ? 
      data.scanTracking.scanId : 'New Scan';
    this.scanTracking = this.action === 'edit' && data.scanTracking ? 
      data.scanTracking : new ScanTracking({});
    this.scanTrackingForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.scanTracking.id],
      scanId: [this.scanTracking.scanId, [Validators.required]],
      patientName: [this.scanTracking.patientName, [Validators.required]],
      scanType: [this.scanTracking.scanType, [Validators.required]],
      modality: [this.scanTracking.modality, [Validators.required]],
      technicianName: [this.scanTracking.technicianName, [Validators.required]],
      scanDate: [this.scanTracking.scanDate, [Validators.required]],
      duration: [this.scanTracking.duration, [Validators.required]],
      status: [this.scanTracking.status, [Validators.required]],
      notes: [this.scanTracking.notes],
    });
  }

  submit() {
    if (this.scanTrackingForm.valid) {
      if (this.action === 'edit') {
        this.scansTrackingService.updateScanTracking(this.scanTrackingForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.scansTrackingService.addScanTracking(this.scanTrackingForm.getRawValue()).subscribe({
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
