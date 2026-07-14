import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { VisitLogsService } from '../../visit-logs.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Visit } from '../../visit-logs.model';
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
  visit: Visit;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-visit-logs-form',
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
export class VisitLogsFormComponent {
  dialogRef = inject<MatDialogRef<VisitLogsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  visitLogsService = inject(VisitLogsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  visitForm: FormGroup;
  visit: Visit;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.visit ? 
      data.visit.visitorName : 'New Visit Log';
    this.visit = this.action === 'edit' && data.visit ? 
      data.visit : new Visit({});
    this.visitForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.visit.id],
      visitorName: [this.visit.visitorName, [Validators.required]],
      visitorPhone: [this.visit.visitorPhone, [Validators.required]],
      visitorEmail: [this.visit.visitorEmail, [Validators.required, Validators.email]],
      purpose: [this.visit.purpose, [Validators.required]],
      personToMeet: [this.visit.personToMeet, [Validators.required]],
      department: [this.visit.department, [Validators.required]],
      visitDate: [this.visit.visitDate, [Validators.required]],
      checkInTime: [this.visit.checkInTime, [Validators.required]],
      checkOutTime: [this.visit.checkOutTime],
      status: [this.visit.status, [Validators.required]],
      idProofType: [this.visit.idProofType, [Validators.required]],
      idProofNumber: [this.visit.idProofNumber, [Validators.required]],
      vehicleNumber: [this.visit.vehicleNumber],
      remarks: [this.visit.remarks],
    });
  }

  submit() {
    if (this.visitForm.valid) {
      if (this.action === 'edit') {
        this.visitLogsService.updateVisit(this.visitForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.visitLogsService.addVisit(this.visitForm.getRawValue()).subscribe({
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
