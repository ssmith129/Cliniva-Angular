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
import { ClaimStatusDeleteComponent } from './dialogs/delete/delete.component';
import { AllClaimStatusFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { ClaimStatus } from './claim-status.model';
import { ClaimStatusService } from './claim-status.service';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrl: './claim-status.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class ClaimStatusComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  claimStatusService = inject(ClaimStatusService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'claim_id', label: 'Claim ID', type: 'text', visible: true },
    {
      def: 'patient_name',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'claim_type', label: 'Claim Type', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Claim Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Approved: 'badge badge-solid-green',
        Rejected: 'badge badge-solid-orange',
        Pending: 'badge badge-solid-purple',
      },
    },
    { def: 'doctor_name', label: 'Doctor Name', type: 'text', visible: true },
    {
      def: 'hospital_name',
      label: 'Hospital Name',
      type: 'text',
      visible: true,
    },
    { def: 'amount', label: 'Claim Amount', type: 'text', visible: true },
    {
      def: 'approved_amount',
      label: 'Approved Amount',
      type: 'text',
      visible: true,
    },
    { def: 'claim_date', label: 'Claim Date', type: 'date', visible: true },
    {
      def: 'rejection_reason',
      label: 'Rejection Reason',
      type: 'text',
      visible: true,
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ClaimStatus>([]);
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
    this.claimStatusService.getAllClaimStatus().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: ClaimStatus, filter: string) =>
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

  handleEdit(row: ClaimStatus) {
    this.openDialog('edit', row);
  }

  handleDelete(row: ClaimStatus) {
    const dialogRef = this.dialog.open(ClaimStatusDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.claim_id !== row.claim_id
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

  handleBulkDelete(selectedRows: ClaimStatus[]) {
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

  openDialog(action: 'add' | 'edit', data?: ClaimStatus) {
    const dialogRef = this.dialog.open(AllClaimStatusFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { claimStatus: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.claim_id === result.claim_id
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
