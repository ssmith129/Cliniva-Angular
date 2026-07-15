import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { ShiftManagementService } from '../../shift-management.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ShiftManagement } from '../../shift-management.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  id: number;
  action: string;
  shiftManagement: ShiftManagement;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-shift-management-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogClose
    ]
})
export class ShiftManagementFormComponent {
  dialogRef = inject<MatDialogRef<ShiftManagementFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  shiftManagementService = inject(ShiftManagementService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  shiftForm: FormGroup;
  shiftManagement: ShiftManagement;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit'
        ? `Edit Shift for ${data.shiftManagement.doctorName}`
        : 'New Shift management';
    this.shiftManagement =
      this.action === 'edit' ? data.shiftManagement : new ShiftManagement({}); // Create a blank object
    this.shiftForm = this.createShiftForm();
  }

  createShiftForm(): FormGroup {
    return this.fb.group({
      doctorId: [this.shiftManagement.doctorId], // Doctor ID
      doctorName: [this.shiftManagement.doctorName, [Validators.required]], // Doctor Name is required
      department: [this.shiftManagement.department, [Validators.required]], // Department is required
      specialty: [this.shiftManagement.specialty], // Specialty
      shiftStartDate: [
        formatDate(this.shiftManagement.shiftStartDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ], // Shift Start Date
      shiftEndDate: [
        formatDate(this.shiftManagement.shiftEndDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ], // Shift End Date
      workDays: [this.shiftManagement.workDays, [Validators.required]], // Work Days (e.g., Mon-Fri)
      shiftHours: [this.shiftManagement.shiftHours, [Validators.required]], // Shift Hours
      shiftType: [this.shiftManagement.shiftType, [Validators.required]], // Shift Type (e.g., Full-time, Part-time)
      availabilityStatus: [
        this.shiftManagement.availabilityStatus,
        [Validators.required],
      ], // Availability Status
      overtimeHours: [this.shiftManagement.overtimeHours], // Overtime Hours
      totalHoursPerWeek: [this.shiftManagement.totalHoursPerWeek], // Total Hours per Week
      shiftNotes: [this.shiftManagement.shiftNotes], // Shift Notes
      img: [this.shiftManagement.img], // Doctor's image path
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  submit() {
    if (this.shiftForm.valid) {
      if (this.action === 'edit') {
        // Update existing shift management
        this.shiftManagementService
          .updateShiftManagement(this.shiftForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return updated shift data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      } else {
        // Add new shift management
        this.shiftManagementService
          .addShiftManagement(this.shiftForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return newly added shift data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
