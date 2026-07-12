import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRecord } from './analytics.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AnalyticsFormComponent } from './dialog/form-dialog/form-dialog.component';
import { AnalyticsDeleteComponent } from './dialog/delete/delete.component';

import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  analyticsService = inject(AnalyticsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'metric', label: 'Metric', type: 'text', visible: true },
    { def: 'value', label: 'Value', type: 'text', visible: true },
    { def: 'change', label: 'Change', type: 'text', visible: true },
    { def: 'period', label: 'Period', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<AnalyticsRecord>([]);
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
    this.analyticsService.getAllAnalytics().subscribe({
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

  handleEdit(row: AnalyticsRecord) {
    this.openDialog('edit', row);
  }

  handleDelete(row: AnalyticsRecord) {
    const dialogRef = this.dialog.open(AnalyticsDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.analyticsService.deleteAnalytics(row.id);
        this.loadData(); // Refresh data from service
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

  handleBulkDelete(selectedRows: AnalyticsRecord[]) {
     // Ideally call service to delete multiple
    selectedRows.forEach(row => this.analyticsService.deleteAnalytics(row.id));
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: AnalyticsRecord) {
    const dialogRef = this.dialog.open(AnalyticsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { analytics: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.analyticsService.addAnalytics(result);
        } else {
          this.analyticsService.updateAnalytics(result);
        }
        this.loadData();
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
