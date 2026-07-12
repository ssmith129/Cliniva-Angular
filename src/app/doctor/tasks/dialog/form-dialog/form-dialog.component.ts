import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  task: Task;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-form',
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
    MatDatepickerModule,
    MatDialogClose
],
})
export class TaskFormComponent {
  dialogRef = inject<MatDialogRef<TaskFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  taskForm: FormGroup;
  task: Task;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.task.title;
      this.task = data.task;
    } else {
      this.dialogTitle = 'New Task';
      const blankObject = {} as Task;
      this.task = new Task(blankObject);
    }
    this.taskForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.task.id],
      taskId: [this.task.taskId, [Validators.required]],
      title: [this.task.title, [Validators.required]],
      description: [this.task.description, [Validators.required]],
      category: [this.task.category, [Validators.required]],
      priority: [this.task.priority, [Validators.required]],
      dueDate: [this.task.dueDate, [Validators.required]],
      status: [this.task.status, [Validators.required]],
      assignedTo: [this.task.assignedTo, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.taskForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class Task {
  id: number;
  taskId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  dueDate: string;
  status: string;
  assignedTo: string;

  constructor(task: Task) {
    {
      this.id = task.id || this.getRandomId();
      this.taskId = task.taskId || '';
      this.title = task.title || '';
      this.description = task.description || '';
      this.category = task.category || '';
      this.priority = task.priority || 'Routine';
      this.dueDate = task.dueDate || '';
      this.status = task.status || 'Pending';
      this.assignedTo = task.assignedTo || '';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
