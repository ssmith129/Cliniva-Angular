import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { TechnicianAssignmentService } from '../../technician-assignment.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechnicianAssignment } from '../../technician-assignment.model';
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
  technicianAssignment: TechnicianAssignment;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-technician-assignment-form',
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
    MatDialogClose,
  ],
})
export class TechnicianAssignmentFormComponent {
  dialogRef = inject<MatDialogRef<TechnicianAssignmentFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  technicianAssignmentService = inject(TechnicianAssignmentService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  technicianAssignmentForm: FormGroup;
  technicianAssignment: TechnicianAssignment;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.technicianAssignment ? 
      data.technicianAssignment.technicianName : 'New Assignment';
    this.technicianAssignment = this.action === 'edit' && data.technicianAssignment ? 
      data.technicianAssignment : new TechnicianAssignment({});
    this.technicianAssignmentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.technicianAssignment.id],
      technicianName: [this.technicianAssignment.technicianName, [Validators.required]],
      testName: [this.technicianAssignment.testName, [Validators.required]],
      patientName: [this.technicianAssignment.patientName, [Validators.required]],
      assignedDate: [this.technicianAssignment.assignedDate, [Validators.required]],
      priority: [this.technicianAssignment.priority, [Validators.required]],
      status: [this.technicianAssignment.status, [Validators.required]],
      department: [this.technicianAssignment.department, [Validators.required]],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.technicianAssignmentForm.valid) {
      if (this.action === 'edit') {
        this.technicianAssignmentService.updateTechnicianAssignment(this.technicianAssignmentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.technicianAssignmentService.addTechnicianAssignment(this.technicianAssignmentForm.getRawValue()).subscribe({
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