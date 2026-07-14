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
import { InventoryRequestsService } from './inventory-requests.service';
import { InventoryRequest } from './inventory-requests.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { InventoryRequestFormComponent } from './dialog/form-dialog/form-dialog.component';
import { InventoryRequestDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-requests',
  templateUrl: './inventory-requests.component.html',
  styleUrls: ['./inventory-requests.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class InventoryRequestsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  inventoryRequestsService = inject(InventoryRequestsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'requestId', label: 'Request ID', type: 'text', visible: true },
    { def: 'itemName', label: 'Item Name', type: 'text', visible: true },
    { def: 'category', label: 'Category', type: 'text', visible: true },
    { def: 'quantity', label: 'Quantity', type: 'text', visible: true },
    { def: 'requestDate', label: 'Request Date', type: 'date', visible: true },
    { def: 'requestedBy', label: 'Requested By', type: 'text', visible: true },
    {
      def: 'priority',
      label: 'Priority',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        High: 'badge-solid-red',
        Normal: 'badge-solid-blue',
        Urgent: 'badge-solid-orange',
      },
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Approved: 'badge-solid-green',
        Pending: 'badge-solid-orange',
        Rejected: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<InventoryRequest>([]);
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
    this.inventoryRequestsService.getAllInventoryRequests().subscribe({
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

  handleEdit(row: InventoryRequest) {
    this.openDialog('edit', row);
  }

  handleDelete(row: InventoryRequest) {
    const dialogRef = this.dialog.open(InventoryRequestDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inventoryRequestsService.deleteInventoryRequest(row.id);
        this.loadData();
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

  handleBulkDelete(selectedRows: InventoryRequest[]) {
    selectedRows.forEach((row) =>
      this.inventoryRequestsService.deleteInventoryRequest(row.id)
    );
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: InventoryRequest) {
    const dialogRef = this.dialog.open(InventoryRequestFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { inventoryRequest: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.inventoryRequestsService.addInventoryRequest(result);
        } else {
          this.inventoryRequestsService.updateInventoryRequest(result);
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
