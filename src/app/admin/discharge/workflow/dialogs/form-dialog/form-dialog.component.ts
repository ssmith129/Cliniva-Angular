import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { DischargeWorkflowService } from '../../workflow.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DischargeWorkflow } from '../../workflow.model';
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
  workflow: DischargeWorkflow;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-workflow-form',
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
        <form class="register-form m-4" [formGroup]="workflowForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Workflow ID</mat-label>
                <input matInput formControlName="workflowId" required>
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
                <mat-label>Discharge Type</mat-label>
                 <mat-select formControlName="dischargeType" required>
                  <mat-option value="Routine">Routine</mat-option>
                  <mat-option value="Transfer">Transfer</mat-option>
                  <mat-option value="LAMA">LAMA</mat-option>
                  <mat-option value="Death">Death</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="approvalStatus" required>
                  <mat-option value="Pending">Pending</mat-option>
                  <mat-option value="In Progress">In Progress</mat-option>
                  <mat-option value="Approved">Approved</mat-option>
                  <mat-option value="Rejected">Rejected</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Admission Date</mat-label>
                <input matInput [matDatepicker]="picker1" formControlName="admissionDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
                <mat-datepicker #picker1></mat-datepicker>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Expected Discharge Date</mat-label>
                <input matInput [matDatepicker]="picker2" formControlName="expectedDischargeDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                <mat-datepicker #picker2></mat-datepicker>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Pending Department</mat-label>
                <input matInput formControlName="pendingDepartment">
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>business</mat-icon>
              </mat-form-field>
            </div>
             <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Finalized By</mat-label>
                <input matInput formControlName="finalizedBy">
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
                <button mat-flat-button class="formSubmitBtn" [disabled]="!workflowForm.valid" type="submit">Save</button>
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
export class WorkflowFormComponent {
  dialogRef = inject<MatDialogRef<WorkflowFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  workflowService = inject(DischargeWorkflowService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  workflowForm: FormGroup;
  workflow: DischargeWorkflow;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.workflow ? 
      data.workflow.workflowId : 'New Workflow';
    this.workflow = this.action === 'edit' && data.workflow ? 
      data.workflow : new DischargeWorkflow({});
    this.workflowForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.workflow.id],
      workflowId: [this.workflow.workflowId, [Validators.required]],
      patientName: [this.workflow.patientName, [Validators.required]],
      admissionDate: [this.workflow.admissionDate, [Validators.required]],
      expectedDischargeDate: [this.workflow.expectedDischargeDate, [Validators.required]],
      dischargeType: [this.workflow.dischargeType, [Validators.required]],
      approvalStatus: [this.workflow.approvalStatus, [Validators.required]],
      pendingDepartment: [this.workflow.pendingDepartment],
      finalizedBy: [this.workflow.finalizedBy],
      notes: [this.workflow.notes],
    });
  }

  submit() {
    if (this.workflowForm.valid) {
      if (this.action === 'edit') {
        this.workflowService.updateDischargeWorkflow(this.workflowForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.workflowService.addDischargeWorkflow(this.workflowForm.getRawValue()).subscribe({
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
