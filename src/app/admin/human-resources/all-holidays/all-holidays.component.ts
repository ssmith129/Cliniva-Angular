import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { HolidayService } from './all-holidays.service';
import { MatDialog } from '@angular/material/dialog';
import { AllHoliday } from './all-holidays.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AllHolidaysFormComponent } from './dialog/form-dialog/form-dialog.component';
import { AllHolidaysDeleteComponent } from './dialog/delete/delete.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-allholiday',
  templateUrl: './all-holidays.component.html',
  styleUrls: ['./all-holidays.component.scss'],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AllHolidayComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  holidayService = inject(HolidayService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'holidayName', label: 'Holiday Name', type: 'text', visible: true },
    { def: 'shift', label: 'Shift', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'location', label: 'Location', type: 'text', visible: false },
    { def: 'holidayType', label: 'Holiday Type', type: 'text', visible: true },
    { def: 'createdBy', label: 'Created By', type: 'text', visible: true },
    {
      def: 'creationDate',
      label: 'Creation Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'approvalStatus',
      label: 'Approval Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Approved: 'badge badge-solid-green',
        Rejected: 'badge badge-solid-orange',
      },
    },
    { def: 'details', label: 'Details', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<AllHoliday>([]);
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
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: AllHoliday, filter: string) =>
          Object.values(data).some((value) =>
            value.toString().toLowerCase().includes(filter)
          );
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: AllHoliday) {
    this.openDialog('edit', row);
  }

  handleDelete(row: AllHoliday) {
    const dialogRef = this.dialog.open(AllHolidaysDeleteComponent, {
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

  handleBulkDelete(selectedRows: AllHoliday[]) {
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

  openDialog(action: 'add' | 'edit', data?: AllHoliday) {
    const dialogRef = this.dialog.open(AllHolidaysFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { allHoliday: data, action },
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
