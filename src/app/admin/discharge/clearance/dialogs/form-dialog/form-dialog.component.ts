import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ClearanceService } from '../../clearance.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Clearance } from '../../clearance.model';
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
  clearance: Clearance;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clearance-form',
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
        <form class="register-form m-4" [formGroup]="clearanceForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Clearance ID</mat-label>
                <input matInput formControlName="clearanceId" required>
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
                <mat-label>Department</mat-label>
                <input matInput formControlName="department" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>business</mat-icon>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
               <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status" required>
                  <mat-option value="Pending">Pending</mat-option>
                  <mat-option value="Cleared">Cleared</mat-option>
                  <mat-option value="Rejected">Rejected</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Requested Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="requestedDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
             <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Cleared By</mat-label>
                <input matInput formControlName="clearedBy">
                 <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>person</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes"></textarea>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>notes</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <div class="example-button-row">
                <button mat-flat-button class="formSubmitBtn" [disabled]="!clearanceForm.valid" type="submit">Save</button>
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
export class ClearanceFormComponent {
  dialogRef = inject<MatDialogRef<ClearanceFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  clearanceService = inject(ClearanceService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  clearanceForm: FormGroup;
  clearance: Clearance;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.clearance ? 
      data.clearance.clearanceId : 'New Clearance Request';
    this.clearance = this.action === 'edit' && data.clearance ? 
      data.clearance : new Clearance({});
    this.clearanceForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.clearance.id],
      clearanceId: [this.clearance.clearanceId, [Validators.required]],
      patientName: [this.clearance.patientName, [Validators.required]],
      department: [this.clearance.department, [Validators.required]],
      requestedDate: [this.clearance.requestedDate, [Validators.required]],
      status: [this.clearance.status, [Validators.required]],
      clearedBy: [this.clearance.clearedBy],
      notes: [this.clearance.notes],
    });
  }

  submit() {
    if (this.clearanceForm.valid) {
      if (this.action === 'edit') {
        this.clearanceService.updateClearance(this.clearanceForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.clearanceService.addClearance(this.clearanceForm.getRawValue()).subscribe({
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
