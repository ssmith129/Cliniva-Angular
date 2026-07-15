import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { StaffService } from '../../staff.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Staff } from '../../staff.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
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
  staff: Staff;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-staff-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
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
        MatDialogClose,
    ]
})
export class AllStaffFormDialog {
  dialogRef = inject<MatDialogRef<AllStaffFormDialog>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  staffService = inject(StaffService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  staffForm: FormGroup;
  staff: Staff;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' ? `Edit ${data.staff.name}` : 'New Staff';
    this.staff = this.action === 'edit' ? data.staff : new Staff({});
    this.staffForm = this.createStaffForm();
  }

  createStaffForm(): FormGroup {
    return this.fb.group({
      id: [this.staff.id],
      img: [this.staff.img],
      name: [this.staff.name, [Validators.required]],
      email: [this.staff.email, [Validators.required, Validators.email]],
      gender: [this.staff.gender],
      joiningDate: [
        formatDate(this.staff.joiningDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      designation: [this.staff.designation],
      address: [this.staff.address],
      mobile: [this.staff.mobile, [Validators.required]],
      salary: [this.staff.salary, [Validators.required]],
      status: [this.staff.status],
      shift: [this.staff.shift],
      experienceYears: [this.staff.experienceYears],
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
    if (this.staffForm.valid) {
      const staffData = this.staffForm.getRawValue();
      if (this.action === 'edit') {
        this.staffService.updateStaff(staffData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
            // Optionally handle error (e.g., display message)
          },
        });
      } else {
        this.staffService.addStaff(staffData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
            // Optionally handle error (e.g., display message)
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
