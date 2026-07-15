import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { DisposalLogFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { DisposalLogDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { DisposalLogsService } from './disposal-logs.service';
import { DisposalLog } from './disposal-logs.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-disposal-logs',
  templateUrl: './disposal-logs.component.html',
  styleUrls: ['./disposal-logs.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class DisposalLogsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  disposalLogsService = inject(DisposalLogsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'disposal_id', label: 'Disposal ID', type: 'text', visible: true },
    { def: 'waste_type', label: 'Waste Type', type: 'text', visible: true },
    { def: 'quantity', label: 'Quantity (kg)', type: 'text', visible: true },
    { def: 'disposal_date', label: 'Disposal Date', type: 'date', visible: true },
    { def: 'disposal_method', label: 'Disposal Method', type: 'text', visible: true },
    { def: 'vendor_name', label: 'Vendor', type: 'text', visible: true },
    {
      def: 'compliance_status',
      label: 'Compliance',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Compliant: 'badge badge-solid-green',
        'Non-Compliant': 'badge badge-solid-red',
        'Under Review': 'badge badge-solid-orange',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<DisposalLog>([]);
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
    this.disposalLogsService.getAllDisposalLogs().subscribe({
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

  handleEdit(row: DisposalLog) {
    this.openDialog('edit', row);
  }

  handleDelete(row: DisposalLog) {
    const dialogRef = this.dialog.open(DisposalLogDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: DisposalLog[]) {
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

  openDialog(action: 'add' | 'edit', data?: DisposalLog) {
    const dialogRef = this.dialog.open(DisposalLogFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { log: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex((record) => record.id === result.id);
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
