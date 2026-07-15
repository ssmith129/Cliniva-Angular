import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PostOpNotesService } from '../../post-op-notes.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostOpNote } from '../../post-op-notes.model';
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
  postOpNote: PostOpNote;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-op-notes-form',
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
        <form class="register-form m-4" [formGroup]="postOpNoteForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Note ID</mat-label>
                <input matInput formControlName="noteId" required>
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
                <mat-label>Note Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="noteDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Recorded By</mat-label>
                <input matInput formControlName="recordedBy" required>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Pain Level (0-10)</mat-label>
                <input matInput formControlName="painLevel" required>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Recovery Status</mat-label>
                <mat-select formControlName="recoveryStatus" required>
                  <mat-option value="Excellent">Excellent</mat-option>
                  <mat-option value="Good">Good</mat-option>
                  <mat-option value="Fair">Fair</mat-option>
                  <mat-option value="Poor">Poor</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Mobility Status</mat-label>
                <mat-select formControlName="mobilityStatus">
                  <mat-option value="Bed Rest">Bed Rest</mat-option>
                  <mat-option value="Limited Mobility">Limited Mobility</mat-option>
                  <mat-option value="Walking with Assistance">Walking with Assistance</mat-option>
                  <mat-option value="Independent">Independent</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Vital Signs</mat-label>
                <input matInput formControlName="vitalSigns" required>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Wound Condition</mat-label>
                <textarea matInput formControlName="woundCondition" required></textarea>
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
                <button mat-flat-button class="formSubmitBtn" [disabled]="!postOpNoteForm.valid" type="submit">Save</button>
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
export class PostOpNotesFormComponent {
  dialogRef = inject<MatDialogRef<PostOpNotesFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  postOpNotesService = inject(PostOpNotesService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  postOpNoteForm: FormGroup;
  postOpNote: PostOpNote;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.postOpNote ? 
      data.postOpNote.noteId : 'New Post-Op Note';
    this.postOpNote = this.action === 'edit' && data.postOpNote ? 
      data.postOpNote : new PostOpNote({});
    this.postOpNoteForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.postOpNote.id],
      noteId: [this.postOpNote.noteId, [Validators.required]],
      patientName: [this.postOpNote.patientName, [Validators.required]],
      surgeryType: [this.postOpNote.surgeryType, [Validators.required]],
      noteDate: [this.postOpNote.noteDate, [Validators.required]],
      recordedBy: [this.postOpNote.recordedBy, [Validators.required]],
      vitalSigns: [this.postOpNote.vitalSigns, [Validators.required]],
      painLevel: [this.postOpNote.painLevel, [Validators.required]],
      recoveryStatus: [this.postOpNote.recoveryStatus, [Validators.required]],
      woundCondition: [this.postOpNote.woundCondition, [Validators.required]],
      medicationsAdministered: [this.postOpNote.medicationsAdministered],
      complications: [this.postOpNote.complications],
      dietInstructions: [this.postOpNote.dietInstructions],
      mobilityStatus: [this.postOpNote.mobilityStatus],
      dischargePlan: [this.postOpNote.dischargePlan],
      notes: [this.postOpNote.notes],
    });
  }

  submit() {
    if (this.postOpNoteForm.valid) {
      if (this.action === 'edit') {
        this.postOpNotesService.updatePostOpNote(this.postOpNoteForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.postOpNotesService.addPostOpNote(this.postOpNoteForm.getRawValue()).subscribe({
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
