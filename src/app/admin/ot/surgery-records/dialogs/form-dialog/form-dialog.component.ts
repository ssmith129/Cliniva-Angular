import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { SurgeryRecordsService } from '../../surgery-records.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurgeryRecord } from '../../surgery-records.model';
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
  surgeryRecord: SurgeryRecord;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-surgery-records-form',
  template: `
    <div class="addContainer">
      <div class="modalHeader">
        <div class="avatarDetails">
          <div class="modalTitle">{{ dialogTitle }}</div>
        </div>
        <button mat-icon-button mat-dialog-close class="modal-close-button" aria-label="Close dialog" type="button">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div mat-dialog-content>
        <form class="register-form m-4" [formGroup]="surgeryRecordForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Surgery ID</mat-label>
                <input matInput formControlName="surgeryId" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>qr_code</mat-icon>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Patient Name</mat-label>
                <input matInput formControlName="patientName" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>face</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Surgery Type</mat-label>
                <input matInput formControlName="surgeryType" required>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Surgeon Name</mat-label>
                <input matInput formControlName="surgeonName" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>person</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
             <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Surgery Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="surgeryDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
               <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Outcome</mat-label>
                <mat-select formControlName="outcome" required>
                  <mat-option value="Successful">Successful</mat-option>
                  <mat-option value="Complicated">Complicated</mat-option>
                  <mat-option value="Failed">Failed</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Start Time</mat-label>
                <input matInput formControlName="startTime" required>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>End Time</mat-label>
                <input matInput formControlName="endTime" required>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Anesthesia Type</mat-label>
                <input matInput formControlName="anesthesiaType">
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Blood Loss</mat-label>
                <input matInput formControlName="bloodLoss">
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Complications</mat-label>
                <textarea matInput formControlName="complications"></textarea>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes"></textarea>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <div class="example-button-row">
                <button mat-flat-button class="formSubmitBtn" [disabled]="!surgeryRecordForm.valid" type="submit">Save</button>
                <button mat-flat-button mat-dialog-close class="formCancelBtn" tabindex="-1">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
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
export class SurgeryRecordsFormComponent {
  dialogRef = inject<MatDialogRef<SurgeryRecordsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  surgeryRecordsService = inject(SurgeryRecordsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  surgeryRecordForm: FormGroup;
  surgeryRecord: SurgeryRecord;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.surgeryRecord ? 
      data.surgeryRecord.surgeryId : 'New Surgery Record';
    this.surgeryRecord = this.action === 'edit' && data.surgeryRecord ? 
      data.surgeryRecord : new SurgeryRecord({});
    this.surgeryRecordForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.surgeryRecord.id],
      surgeryId: [this.surgeryRecord.surgeryId, [Validators.required]],
      patientName: [this.surgeryRecord.patientName, [Validators.required]],
      surgeryType: [this.surgeryRecord.surgeryType, [Validators.required]],
      surgeonName: [this.surgeryRecord.surgeonName, [Validators.required]],
      surgeryDate: [this.surgeryRecord.surgeryDate, [Validators.required]],
      startTime: [this.surgeryRecord.startTime, [Validators.required]],
      endTime: [this.surgeryRecord.endTime, [Validators.required]],
      outcome: [this.surgeryRecord.outcome, [Validators.required]],
      anesthesiaType: [this.surgeryRecord.anesthesiaType],
      complications: [this.surgeryRecord.complications],
      bloodLoss: [this.surgeryRecord.bloodLoss],
      notes: [this.surgeryRecord.notes],
    });
  }

  submit() {
    if (this.surgeryRecordForm.valid) {
      if (this.action === 'edit') {
        this.surgeryRecordsService.updateSurgeryRecord(this.surgeryRecordForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.surgeryRecordsService.addSurgeryRecord(this.surgeryRecordForm.getRawValue()).subscribe({
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
