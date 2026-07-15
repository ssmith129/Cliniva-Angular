import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PreOpAssessmentFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PreOpAssessmentDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { PreOpAssessmentService } from './pre-op-assessment.service';
import { PreOpAssessment } from './pre-op-assessment.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pre-op-assessment',
  templateUrl: './pre-op-assessment.component.html',
  styleUrls: ['./pre-op-assessment.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PreOpAssessmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  preOpAssessmentService = inject(PreOpAssessmentService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'assessmentId',
      label: 'Assessment ID',
      type: 'text',
      visible: true,
    },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'surgeryType', label: 'Surgery Type', type: 'text', visible: true },
    { def: 'assessmentDate', label: 'Date', type: 'date', visible: true },
    { def: 'assessedBy', label: 'Assessed By', type: 'text', visible: true },
    {
      def: 'fitnessStatus',
      label: 'Fitness',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Fit: 'badge badge-solid-green',
        'Conditionally Fit': 'badge badge-solid-orange',
        'Not Fit': 'badge badge-solid-red',
      },
    },
    {
      def: 'riskLevel',
      label: 'Risk Level',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Low: 'badge badge-solid-green',
        Medium: 'badge badge-solid-orange',
        High: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PreOpAssessment>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.preOpAssessmentService.getAllPreOpAssessments().subscribe({
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

  handleEdit(row: PreOpAssessment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PreOpAssessment) {
    const dialogRef = this.dialog.open(PreOpAssessmentDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.id !== row.id
        );
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: PreOpAssessment[]) {
    this.dataSource.data = this.dataSource.data.filter(
      (item) => !selectedRows.includes(item)
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: PreOpAssessment) {
    const dialogRef = this.dialog.open(PreOpAssessmentFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { preOpAssessment: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.id === result.id
          );
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
          }
        }
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
