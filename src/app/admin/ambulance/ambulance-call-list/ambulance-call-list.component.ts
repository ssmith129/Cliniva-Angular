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
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AmbulanceCallListFormComponent } from './dialog/form-dialog/form-dialog.component';
import { AmbulanceCallListDeleteComponent } from './dialog/delete/delete.component';
import { AmbulanceCallList } from './ambulance-call-list.model';
import { AmbulanceCallListService } from './ambulance-call-list.service';

import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ambulance-call-list',
  templateUrl: './ambulance-call-list.component.html',
  styleUrls: ['./ambulance-call-list.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class AmbulanceCallListComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  ambulanceCallListService = inject(AmbulanceCallListService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'case_no', label: 'Case Number', type: 'text', visible: true },
    { def: 'patient_name', label: 'Patient Name', type: 'nameWithImage', visible: true },
    {
      def: 'patient_no',
      label: 'Patient Number',
      type: 'phone',
      visible: true,
    },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'vehicle_no', label: 'Vehicle Number', type: 'text', visible: true },
    { def: 'driver_name', label: 'Driver Name', type: 'text', visible: true },
    { def: 'driver_no', label: 'Driver Number', type: 'phone', visible: true },
    {
      def: 'patient_address',
      label: 'Patient Address',
      type: 'address',
      visible: true,
    },
    { def: 'note', label: 'Notes', type: 'text', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<AmbulanceCallList>([]);
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
    this.ambulanceCallListService.getAllAmbulanceCallLists().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: AmbulanceCallList,
          filter: string
        ) =>
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

  handleEdit(row: AmbulanceCallList) {
    this.openDialog('edit', row);
  }

  handleDelete(row: AmbulanceCallList) {
    const dialogRef = this.dialog.open(AmbulanceCallListDeleteComponent, {
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

  handleBulkDelete(selectedRows: AmbulanceCallList[]) {
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

  openDialog(action: 'add' | 'edit', data?: AmbulanceCallList) {
    const dialogRef = this.dialog.open(AmbulanceCallListFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { ambulanceCallList: data, action },
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
