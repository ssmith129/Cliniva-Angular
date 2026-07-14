import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ComplaintResolutionService } from '../../complaint-resolution.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Complaint } from '../../complaint-resolution.model';
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
  complaint: Complaint;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-complaint-resolution-form',
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
export class ComplaintResolutionFormComponent {
  dialogRef = inject<MatDialogRef<ComplaintResolutionFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  complaintResolutionService = inject(ComplaintResolutionService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  complaintForm: FormGroup;
  complaint: Complaint;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.complaint ? 
      data.complaint.complaint_id : 'New Complaint';
    this.complaint = this.action === 'edit' && data.complaint ? 
      data.complaint : new Complaint({});
    this.complaintForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.complaint.id],
      complaint_id: [this.complaint.complaint_id, [Validators.required]],
      patient_name: [this.complaint.patient_name, [Validators.required]],
      complaint_date: [this.complaint.complaint_date, [Validators.required]],
      category: [this.complaint.category, [Validators.required]],
      priority: [this.complaint.priority, [Validators.required]],
      status: [this.complaint.status, [Validators.required]],
      complaint_details: [this.complaint.complaint_details, [Validators.required]],
      assigned_to: [this.complaint.assigned_to],
      resolution_date: [this.complaint.resolution_date],
      resolution_details: [this.complaint.resolution_details],
      notes: [this.complaint.notes],
    });
  }

  submit() {
    if (this.complaintForm.valid) {
      if (this.action === 'edit') {
        this.complaintResolutionService.updateComplaint(this.complaintForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.complaintResolutionService.addComplaint(this.complaintForm.getRawValue()).subscribe({
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
