import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BreakdownReportingFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { BreakdownReportingDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { BreakdownReportingService } from './breakdown-reporting.service';
import { BreakdownReport } from './breakdown-reporting.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-breakdown-reporting',
  templateUrl: './breakdown-reporting.component.html',
  styleUrls: ['./breakdown-reporting.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class BreakdownReportingComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  breakdownReportingService = inject(BreakdownReportingService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'breakdown_id', label: 'ID', type: 'text', visible: true },
    { def: 'equipment_name', label: 'Equipment', type: 'text', visible: true },
    {
      def: 'reported_date',
      label: 'Reported Date',
      type: 'date',
      visible: true,
    },
    { def: 'reported_by', label: 'Reported By', type: 'text', visible: true },
    {
      def: 'severity',
      label: 'Severity',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Critical: 'badge badge-solid-red',
        High: 'badge badge-solid-orange',
        Medium: 'badge badge-solid-blue',
        Low: 'badge badge-solid-green',
      },
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Reported: 'badge badge-solid-orange',
        'Under Repair': 'badge badge-solid-blue',
        Resolved: 'badge badge-solid-green',
        'Pending Parts': 'badge badge-solid-brown',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<BreakdownReport>([]);
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
    this.breakdownReportingService.getAllReports().subscribe({
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

  handleEdit(row: BreakdownReport) {
    this.openDialog('edit', row);
  }

  handleDelete(row: BreakdownReport) {
    const dialogRef = this.dialog.open(BreakdownReportingDeleteComponent, {
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

  handleBulkDelete(selectedRows: BreakdownReport[]) {
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

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: BreakdownReport) {
    const dialogRef = this.dialog.open(BreakdownReportingFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { report: data, action },
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
