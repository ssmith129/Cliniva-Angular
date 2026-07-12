import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface ProgressNote {
  id: string;
  patientName: string;
  therapistName: string;
  sessionDate: string;
  exercises: string;
  painBefore: number;
  painAfter: number;
  clinicalRemarks: string;
}

@Component({
  selector: 'app-progress-notes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSnackBarModule,
    BreadcrumbComponent
  ],
  templateUrl: './progress-notes.component.html',
  styleUrls: ['./progress-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressNotesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  progressForm!: FormGroup;
  notes = signal<ProgressNote[]>([
    { id: '1', patientName: 'John Smith', therapistName: 'Dr. Helen Keller (PT)', sessionDate: '10:30 AM', exercises: 'Shoulder extension ROM, passive stretching, ice pack application', painBefore: 7, painAfter: 3, clinicalRemarks: 'Significant progress. Range of motion increased by 15 degrees. Patient tolerated exercise well.' },
    { id: '2', patientName: 'Emily Carter', therapistName: 'Dr. David Villa (PT)', sessionDate: '09:15 AM', exercises: 'Treadmill walking (15 mins), quad sets, straight leg raises', painBefore: 5, painAfter: 2, clinicalRemarks: 'Gait alignment looks better. Mild fatigue towards end of session.' },
  ]);

  editingIndex = signal<number | null>(null);

  ngOnInit() {
    const patientParam = this.route.snapshot.queryParamMap.get('patient') || '';

    this.progressForm = this.fb.group({
      patientName: [patientParam, [Validators.required]],
      exercises: ['', [Validators.required]],
      painBefore: [5, [Validators.required]],
      painAfter: [2, [Validators.required]],
      clinicalRemarks: ['', [Validators.required]],
    });
  }

  saveNote() {
    if (this.progressForm.invalid) {
      this.snackBar.open('Please fill out all required fields first.', 'Close', { duration: 3000 });
      return;
    }

    const val = this.progressForm.value;
    const idx = this.editingIndex();

    const noteData: ProgressNote = {
      id: idx !== null ? this.notes()[idx].id : String(Date.now()),
      patientName: val.patientName,
      therapistName: 'Dr. Current (PT)',
      sessionDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      exercises: val.exercises,
      painBefore: val.painBefore,
      painAfter: val.painAfter,
      clinicalRemarks: val.clinicalRemarks
    };

    if (idx !== null) {
      // Update
      const list = [...this.notes()];
      list[idx] = noteData;
      this.notes.set(list);
      this.editingIndex.set(null);
      this.snackBar.open('Session note updated successfully!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
    } else {
      // Add
      this.notes.set([noteData, ...this.notes()]);
      this.snackBar.open('Session note added successfully!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
    }

    this.resetForm();
  }

  editNote(index: number) {
    const note = this.notes()[index];
    this.progressForm.patchValue({
      patientName: note.patientName,
      exercises: note.exercises,
      painBefore: note.painBefore,
      painAfter: note.painAfter,
      clinicalRemarks: note.clinicalRemarks
    });
    this.editingIndex.set(index);
  }

  deleteNote(index: number) {
    const list = [...this.notes()];
    list.splice(index, 1);
    this.notes.set(list);
    if (this.editingIndex() === index) {
      this.resetForm();
    } else if (this.editingIndex() !== null && this.editingIndex()! > index) {
      this.editingIndex.set(this.editingIndex()! - 1);
    }
    this.snackBar.open('Session note deleted.', 'Close', { duration: 2000 });
  }

  resetForm() {
    this.progressForm.patchValue({
      patientName: '',
      exercises: '',
      painBefore: 5,
      painAfter: 2,
      clinicalRemarks: ''
    });
    this.editingIndex.set(null);
  }
}
