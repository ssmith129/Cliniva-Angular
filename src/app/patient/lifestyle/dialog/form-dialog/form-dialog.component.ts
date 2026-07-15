import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseRoutine } from '../../lifestyle.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


export interface DialogData {
  id: number;
  action: string;
  routine: ExerciseRoutine;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-exercise-routine-form',
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
    MatDialogClose
],
})
export class ExerciseRoutineFormComponent {
  dialogRef = inject<MatDialogRef<ExerciseRoutineFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  routineForm: FormGroup;
  routine: ExerciseRoutine;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.routine.name;
      this.routine = data.routine;
    } else {
      this.dialogTitle = 'New Exercise Routine';
      const blankObject = {} as ExerciseRoutine;
      this.routine = new ExerciseRoutineClass(blankObject);
    }
    this.routineForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.routine.id],
      name: [this.routine.name, [Validators.required]],
      difficulty: [this.routine.difficulty, [Validators.required]],
      duration: [this.routine.duration, [Validators.required]],
      frequency: [this.routine.frequency, [Validators.required]],
      status: [this.routine.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.routineForm.valid) {
      this.dialogRef.close(this.routineForm.getRawValue());
    }
  }
}

export class ExerciseRoutineClass {
  id: number;
  name: string;
  difficulty: string;
  duration: string;
  frequency: string;
  status: string;

  constructor(routine: ExerciseRoutine) {
    this.id = routine.id || 0;
    this.name = routine.name || '';
    this.difficulty = routine.difficulty || 'Beginner';
    this.duration = routine.duration || '';
    this.frequency = routine.frequency || '';
    this.status = routine.status || 'Active';
  }
}
