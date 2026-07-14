import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { VirtualVisitRecordsService } from '../../virtual-visit-records.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualVisitRecord } from '../../virtual-visit-records.model';
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
  record: VirtualVisitRecord;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-virtual-visit-record-form',
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
export class VirtualVisitRecordFormComponent {
  dialogRef = inject<MatDialogRef<VirtualVisitRecordFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  virtualVisitRecordsService = inject(VirtualVisitRecordsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  recordForm: FormGroup;
  record: VirtualVisitRecord;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.record ? 
      data.record.visit_id : 'New Record';
    this.record = this.action === 'edit' && data.record ? 
      data.record : new VirtualVisitRecord({});
    this.recordForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.record.id],
      visit_id: [this.record.visit_id, [Validators.required]],
      patient_name: [this.record.patient_name, [Validators.required]],
      doctor_name: [this.record.doctor_name, [Validators.required]],
      visit_date: [this.record.visit_date, [Validators.required]],
      duration: [this.record.duration],
      chief_complaint: [this.record.chief_complaint, [Validators.required]],
      diagnosis: [this.record.diagnosis, [Validators.required]],
      prescription: [this.record.prescription],
      follow_up_date: [this.record.follow_up_date],
      notes: [this.record.notes],
    });
  }

  submit() {
    if (this.recordForm.valid) {
      if (this.action === 'edit') {
        this.virtualVisitRecordsService.updateRecord(this.recordForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.virtualVisitRecordsService.addRecord(this.recordForm.getRawValue()).subscribe({
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
