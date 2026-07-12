import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClinicalNote } from '../../clinical-notes.model';
import { ClinicalNotesService } from '../../clinical-notes.service';
import { AiService } from '@core/service/ai.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-notes-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSnackBarModule
],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class ClinicalNotesFormComponent implements OnInit {
  dialogRef = inject<MatDialogRef<ClinicalNotesFormComponent>>(MatDialogRef);
  data = inject<{
    clinicalNote?: ClinicalNote;
    action: 'add' | 'edit';
}>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private clinicalNotesService = inject(ClinicalNotesService);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  action: 'add' | 'edit';
  dialogTitle: string;
  clinicalNoteForm: FormGroup;
  clinicalNote: ClinicalNote;
  isAiLoading = false;

  statusOptions = ['Draft', 'Pending Review', 'Finalized'];

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'add' ? 'Add Clinical Note' : 'Edit Clinical Note';
    this.clinicalNote = data.clinicalNote || new ClinicalNote({});
    this.clinicalNoteForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.action === 'edit' && this.clinicalNote) {
      this.clinicalNoteForm.patchValue(this.clinicalNote);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.clinicalNote.id],
      patientName: [this.clinicalNote.patientName, [Validators.required]],
      doctorName: [this.clinicalNote.doctorName, [Validators.required]],
      noteType: [this.clinicalNote.noteType, [Validators.required]],
      noteDate: [this.clinicalNote.noteDate, [Validators.required]],
      content: [this.clinicalNote.content, [Validators.required]],
      status: [this.clinicalNote.status, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.clinicalNoteForm.valid) {
      const formData = this.clinicalNoteForm.getRawValue();
      const clinicalNote = new ClinicalNote(formData);

      if (this.action === 'add') {
        this.clinicalNotesService.addClinicalNote(clinicalNote).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      } else {
        this.clinicalNotesService.updateClinicalNote(clinicalNote).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      }
    }
  }

  generateAiScribe() {
    const rawContent = this.clinicalNoteForm.get('content')?.value;
    if (!rawContent || rawContent.length < 10) {
      this.snackBar.open('Please enter at least 10 characters of raw notes first.', 'Close', { duration: 3000 });
      return;
    }

    this.isAiLoading = true;
    const prompt = `Act as a professional medical scribe. Transform the following raw observations into a structured clinical note with these exact headers: SYMPTOMS, DIAGNOSIS, and RECOMMENDED PLAN. 
    
    Raw Notes: ${rawContent}`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.clinicalNoteForm.patchValue({ content: res });
        this.isAiLoading = false;
        this.snackBar.open('AI Scribe completed successfully!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
      },
      error: () => {
        this.isAiLoading = false;
        this.snackBar.open('AI Scribe failed. Please check your AI settings.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}