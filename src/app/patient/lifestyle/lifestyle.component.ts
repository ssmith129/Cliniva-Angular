import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LifestyleService } from './lifestyle.service';
import { ExerciseRoutine } from './lifestyle.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { ExerciseRoutineFormComponent } from './dialog/form-dialog/form-dialog.component';
import { ExerciseRoutineDeleteComponent } from './dialog/delete/delete.component';
import { AiPlannerDialogComponent } from './dialog/ai-planner-dialog/ai-planner-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class LifestyleComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  lifestyleService = inject(LifestyleService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Routine Name', type: 'text', visible: true },
    { def: 'difficulty', label: 'Difficulty', type: 'text', visible: true },
    { def: 'duration', label: 'Duration', type: 'text', visible: true },
    { def: 'frequency', label: 'Frequency', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge-solid-green',
        Inactive: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ExerciseRoutine>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onExploreDiet() {
    this.dialog.open(AiPlannerDialogComponent, {
      width: '60vw',
      maxWidth: '100vw',
      autoFocus: false,
    });
  }

  onStartExercise() {
    this.showNotification(
      'snackbar-success',
      'Starting Exercise Routine...!!!',
      'bottom',
      'center',
    );
  }

  onFindPeace() {
    this.showNotification(
      'snackbar-info',
      'Opening Meditation Resources...!!!',
      'bottom',
      'center',
    );
  }

  loadData() {
    this.isLoading = true;
    this.lifestyleService
      .getAllExerciseRoutines()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error: (_err) => {
          this.isLoading = false;
        },
      });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: ExerciseRoutine) {
    this.openDialog('edit', row);
  }

  handleDelete(row: ExerciseRoutine) {
    const dialogRef = this.dialog.open(ExerciseRoutineDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lifestyleService.deleteExerciseRoutine(row.id);
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center',
        );
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: ExerciseRoutine[]) {
    selectedRows.forEach((row) =>
      this.lifestyleService.deleteExerciseRoutine(row.id),
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center',
    );
  }

  openDialog(action: 'add' | 'edit', data?: ExerciseRoutine) {
    const dialogRef = this.dialog.open(ExerciseRoutineFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { routine: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.lifestyleService.addExerciseRoutine(result);
        } else {
          this.lifestyleService.updateExerciseRoutine(result);
        }
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
          'bottom',
          'center',
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition,
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
