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
import { ItemStockListService } from './item-stock-list.service';
import { ItemStockList } from './item-stock-list.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ItemStockListFormComponent } from './dialog/form-dialog/form-dialog.component';
import { ItemStockListDeleteComponent } from './dialog/delete/delete.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-stock-list',
  templateUrl: './item-stock-list.component.html',
  styleUrls: ['./item-stock-list.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ItemStockListComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  itemStockListService = inject(ItemStockListService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'i_name', label: 'Item Name', type: 'text', visible: true },
    { def: 'category', label: 'Category', type: 'text', visible: true },
    { def: 'qty', label: 'Quantity', type: 'text', visible: true },
    {
      def: 'aiRisk',
      label: 'Stock Risk',
      type: 'status',
      visible: true,
      tooltipField: 'aiReason',
      statusBadgeMap: {
        'Optimal': 'badge-solid-green',
        'Watch': 'badge-solid-orange',
        'Critical': 'badge-solid-red'
      }
    },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'price', label: 'Price', type: 'text', visible: true },
    { def: 'details', label: 'Details', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ItemStockList>([]);
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
    this.itemStockListService.getAllItemStockLists().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.calculateRiskLevels(this.dataSource.data);
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: ItemStockList,
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

  private calculateRiskLevels(data: ItemStockList[]) {
    data.forEach(item => {
      const quantity = parseInt(item.qty);
      if (quantity < 10) {
        item.aiRisk = 'Critical';
        item.aiReason = `Urgent: Stock level (${quantity}) is below minimum safety threshold. Reorder required immediately.`;
      } else if (quantity < 50) {
        item.aiRisk = 'Watch';
        item.aiReason = `Predictive: Consumption rate suggests stock-out within 7 days. Plan for replenishment.`;
      } else {
        item.aiRisk = 'Optimal';
        item.aiReason = 'Stock levels are stable based on current usage trends.';
      }
    });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: ItemStockList) {
    this.openDialog('edit', row);
  }

  handleDelete(row: ItemStockList) {
    const dialogRef = this.dialog.open(ItemStockListDeleteComponent, {
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

  handleBulkDelete(selectedRows: ItemStockList[]) {
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

  openDialog(action: 'add' | 'edit', data?: ItemStockList) {
    const dialogRef = this.dialog.open(ItemStockListFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { itemStockList: data, action },
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
