import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { BloodStock } from './blood-stock.model';
import { BloodStockService } from './blood-stock.service';
import { BloodStockFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { BloodStockDeleteComponent } from './dialogs/delete/delete.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blood-stock',
  templateUrl: './blood-stock.component.html',
  styleUrl: './blood-stock.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class BloodStockComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  bloodStockService = inject(BloodStockService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'bloodProductID',
      label: 'Blood Product ID',
      type: 'text',
      visible: true,
    },
    { def: 'bloodType', label: 'Blood Type', type: 'text', visible: true },
    {
      def: 'componentType',
      label: 'Component Type',
      type: 'text',
      visible: true,
    },
    {
      def: 'quantityInStock',
      label: 'Quantity In Stock',
      type: 'text',
      visible: true,
    },
    { def: 'expiryDate', label: 'Expiry Date', type: 'date', visible: true },
    {
      def: 'collectionDate',
      label: 'Collection Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'storageLocation',
      label: 'Storage Location',
      type: 'text',
      visible: true,
    },
    {
      def: 'donationStatus',
      label: 'Donation Status',
      type: 'text',
      visible: true,
    },
    { def: 'batchNumber', label: 'Batch Number', type: 'text', visible: true },
    {
      def: 'conditionQualityStatus',
      label: 'Condition/Quality Status',
      type: 'text',
      visible: true,
    },
    {
      def: 'temperatureRange',
      label: 'Temperature Range',
      type: 'text',
      visible: true,
    },
    {
      def: 'dateLastUpdated',
      label: 'Date Last Updated',
      type: 'date',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<BloodStock>([]);
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
    this.bloodStockService.getAllBloodStocks().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: BloodStock, filter: string) =>
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

  handleEdit(row: BloodStock) {
    this.openDialog('edit', row);
  }

  handleDelete(row: BloodStock) {
    const dialogRef = this.dialog.open(BloodStockDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.bloodProductID !== row.bloodProductID
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

  handleBulkDelete(selectedRows: BloodStock[]) {
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

  openDialog(action: 'add' | 'edit', data?: BloodStock) {
    const dialogRef = this.dialog.open(BloodStockFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { bloodStock: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.bloodProductID === result.bloodProductID
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
