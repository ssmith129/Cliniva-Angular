import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MaintenanceScheduleService } from '../../maintenance-schedule.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceSchedule } from '../../maintenance-schedule.model';
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
  schedule: MaintenanceSchedule;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-maintenance-schedule-form',
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
export class MaintenanceScheduleFormComponent {
  dialogRef = inject<MatDialogRef<MaintenanceScheduleFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  maintenanceScheduleService = inject(MaintenanceScheduleService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  scheduleForm: FormGroup;
  schedule: MaintenanceSchedule;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.schedule ? 
      data.schedule.maintenance_id : 'New Schedule';
    this.schedule = this.action === 'edit' && data.schedule ? 
      data.schedule : new MaintenanceSchedule({});
    this.scheduleForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.schedule.id],
      maintenance_id: [this.schedule.maintenance_id, [Validators.required]],
      equipment_id: [this.schedule.equipment_id, [Validators.required]],
      equipment_name: [this.schedule.equipment_name, [Validators.required]],
      maintenance_type: [this.schedule.maintenance_type, [Validators.required]],
      scheduled_date: [this.schedule.scheduled_date, [Validators.required]],
      scheduled_time: [this.schedule.scheduled_time],
      performed_by: [this.schedule.performed_by, [Validators.required]],
      vendor_name: [this.schedule.vendor_name],
      estimated_duration: [this.schedule.estimated_duration],
      status: [this.schedule.status, [Validators.required]],
      completion_date: [this.schedule.completion_date],
      next_maintenance: [this.schedule.next_maintenance],
      cost: [this.schedule.cost],
      work_performed: [this.schedule.work_performed],
      notes: [this.schedule.notes],
    });
  }

  submit() {
    if (this.scheduleForm.valid) {
      if (this.action === 'edit') {
        this.maintenanceScheduleService.updateSchedule(this.scheduleForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.maintenanceScheduleService.addSchedule(this.scheduleForm.getRawValue()).subscribe({
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
