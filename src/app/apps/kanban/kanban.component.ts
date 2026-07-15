import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  avatar: string;
  avatarImage: string;
  dueDate: Date | string;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,

    MatTooltipModule,
    BreadcrumbComponent,
  ],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Kanban Board',
      items: ['Apps'],
      active: 'Kanban Board',
    },
  ];

  searchText = '';
  selectedPriority = 'All';

  // Modal controls
  isModalOpen = false;
  dialogTitle = 'New Task';
  isNewTask = true;
  selectedColumn = 'todo';
  currentTaskId = '';
  taskForm: FormGroup;

  // Kanban Columns
  todo: KanbanTask[] = [
    {
      id: '101',
      title: 'Lab Report Review',
      description: 'Review biochem reports and update charts for patients in Ward B.',
      priority: 'High',
      assignedTo: 'Sarah Smith',
      avatar: 'SS',
      avatarImage: 'assets/images/user/user1.jpg',
      dueDate: new Date(2026, 6, 15),
    },
    {
      id: '102',
      title: 'ICU Ventilator Check',
      description: 'Perform routine calibration and filter inspection on ICU ventilator units.',
      priority: 'Low',
      assignedTo: 'John Deo',
      avatar: 'JD',
      avatarImage: 'assets/images/user/user2.jpg',
      dueDate: new Date(2026, 6, 20),
    },
  ];

  inProgress: KanbanTask[] = [
    {
      id: '103',
      title: 'Verify Blood Bank Reserves',
      description: 'Perform visual audits and log counts of O-Negative and A-Positive blood types.',
      priority: 'Medium',
      assignedTo: 'Jens Brincker',
      avatar: 'JB',
      avatarImage: 'assets/images/user/user3.jpg',
      dueDate: new Date(2026, 6, 12),
    },
  ];

  review: KanbanTask[] = [
    {
      id: '104',
      title: 'Prepare Operating Room 3',
      description: 'Sterilize surgical apparatus and prepare layout for cardiac surgery scheduled at 1:00 PM.',
      priority: 'High',
      assignedTo: 'Mark Hay',
      avatar: 'MH',
      avatarImage: 'assets/images/user/user4.jpg',
      dueDate: new Date(2026, 6, 10),
    },
  ];

  done: KanbanTask[] = [
    {
      id: '105',
      title: 'Discharge Clearance Ward 4',
      description: 'Finalize outstanding medical bills and issue patient clearance summaries.',
      priority: 'Low',
      assignedTo: 'Sue Woodger',
      avatar: 'SW',
      avatarImage: 'assets/images/user/user5.jpg',
      dueDate: new Date(2026, 5, 28),
    },
  ];

  columnListIds = ['todoList', 'inProgressList', 'reviewList', 'doneList'];

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      priority: ['Medium', Validators.required],
      assignedTo: ['Sarah Smith', Validators.required],
      dueDate: [new Date(), Validators.required],
    });
  }

  filterTasks(tasks: KanbanTask[]): KanbanTask[] {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesPriority =
        this.selectedPriority === 'All' || task.priority === this.selectedPriority;
      return matchesSearch && matchesPriority;
    });
  }

  drop(event: CdkDragDrop<KanbanTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.cdr.markForCheck();
  }

  openAddTask(column: string): void {
    this.isNewTask = true;
    this.dialogTitle = 'Add New Task';
    this.selectedColumn = column;
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'Medium',
      assignedTo: 'Sarah Smith',
      dueDate: new Date(),
    });
    this.isModalOpen = true;
    this.cdr.markForCheck();
  }

  openEditTask(task: KanbanTask, column: string): void {
    this.isNewTask = false;
    this.dialogTitle = 'Edit Task';
    this.selectedColumn = column;
    this.currentTaskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignedTo: task.assignedTo,
      dueDate: new Date(task.dueDate),
    });
    this.isModalOpen = true;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cdr.markForCheck();
  }

  saveTask(): void {
    if (this.taskForm.invalid) return;

    const formVal = this.taskForm.value;
    const initials = formVal.assignedTo
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
    const avatarImg = this.getAvatarImage(formVal.assignedTo);

    if (this.isNewTask) {
      const newTask: KanbanTask = {
        id: this.getRandomId(),
        title: formVal.title,
        description: formVal.description,
        priority: formVal.priority,
        assignedTo: formVal.assignedTo,
        avatar: initials,
        avatarImage: avatarImg,
        dueDate: formVal.dueDate,
      };

      this.getColumnArray(this.selectedColumn).unshift(newTask);
    } else {
      const colArray = this.getColumnArray(this.selectedColumn);
      const index = colArray.findIndex((t) => t.id === this.currentTaskId);
      if (index !== -1) {
        colArray[index] = {
          ...colArray[index],
          title: formVal.title,
          description: formVal.description,
          priority: formVal.priority,
          assignedTo: formVal.assignedTo,
          avatar: initials,
          avatarImage: avatarImg,
          dueDate: formVal.dueDate,
        };
      }
    }

    this.isModalOpen = false;
    this.cdr.markForCheck();
  }

  getAvatarImage(name: string): string {
    switch (name) {
      case 'Sarah Smith': return 'assets/images/user/user1.jpg';
      case 'John Deo': return 'assets/images/user/user2.jpg';
      case 'Jens Brincker': return 'assets/images/user/user3.jpg';
      case 'Mark Hay': return 'assets/images/user/user4.jpg';
      case 'Sue Woodger': return 'assets/images/user/user5.jpg';
      default: return 'assets/images/user/user1.jpg';
    }
  }

  deleteTask(): void {
    const colArray = this.getColumnArray(this.selectedColumn);
    const index = colArray.findIndex((t) => t.id === this.currentTaskId);
    if (index !== -1) {
      colArray.splice(index, 1);
    }
    this.isModalOpen = false;
    this.cdr.markForCheck();
  }

  private getColumnArray(column: string): KanbanTask[] {
    switch (column) {
      case 'todo': return this.todo;
      case 'inProgress': return this.inProgress;
      case 'review': return this.review;
      case 'done': return this.done;
      default: return this.todo;
    }
  }

  private getRandomId(): string {
    return Math.floor(100 + Math.random() * 900).toString();
  }
}
