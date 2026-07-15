import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { OTSchedulingService } from '../../scheduling.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { OTSchedule } from '../../scheduling.model';
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
  otSchedule: OTSchedule;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ot-scheduling-form',
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
export class OTSchedulingFormComponent {
  dialogRef = inject<MatDialogRef<OTSchedulingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  otSchedulingService = inject(OTSchedulingService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  otScheduleForm: FormGroup;
  otSchedule: OTSchedule;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' && data.otSchedule
        ? data.otSchedule.scheduleId
        : 'New OT Schedule';
    this.otSchedule =
      this.action === 'edit' && data.otSchedule
        ? data.otSchedule
        : new OTSchedule({});
    this.otScheduleForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.otSchedule.id],
      scheduleId: [this.otSchedule.scheduleId, [Validators.required]],
      patientName: [this.otSchedule.patientName, [Validators.required]],
      surgeryType: [this.otSchedule.surgeryType, [Validators.required]],
      surgeonName: [this.otSchedule.surgeonName, [Validators.required]],
      anesthetistName: [this.otSchedule.anesthetistName, [Validators.required]],
      otRoom: [this.otSchedule.otRoom, [Validators.required]],
      scheduledDate: [this.otSchedule.scheduledDate, [Validators.required]],
      scheduledTime: [this.otSchedule.scheduledTime, [Validators.required]],
      duration: [this.otSchedule.duration, [Validators.required]],
      status: [this.otSchedule.status, [Validators.required]],
      notes: [this.otSchedule.notes],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.otScheduleForm.valid) {
      if (this.action === 'edit') {
        this.otSchedulingService
          .updateOTSchedule(this.otScheduleForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response);
            },
            error: (_error) => {
            },
          });
      } else {
        this.otSchedulingService
          .addOTSchedule(this.otScheduleForm.getRawValue())
          .subscribe({
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
