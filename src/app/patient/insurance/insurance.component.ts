import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { InsuranceService } from './insurance.service';
import { InsuranceClaim } from './insurance.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { InsuranceClaimFormComponent } from './dialog/form-dialog/form-dialog.component';
import { InsuranceClaimDeleteComponent } from './dialog/delete/delete.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class InsuranceComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  insuranceService = inject(InsuranceService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'claimId', label: 'Claim ID', type: 'text', visible: true },
    { def: 'policyId', label: 'Policy ID', type: 'text', visible: true },
    { def: 'claimDate', label: 'Claim Date', type: 'date', visible: true },
    { def: 'claimType', label: 'Claim Type', type: 'text', visible: true },
    { def: 'claimAmount', label: 'Claim Amount', type: 'text', visible: true },
    { def: 'approvedAmount', label: 'Approved', type: 'text', visible: true },
    { def: 'submittedDate', label: 'Submitted', type: 'date', visible: true },
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

  dataSource = new MatTableDataSource<InsuranceClaim>([]);
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
    this.insuranceService
      .getAllClaims()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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

  handleEdit(row: InsuranceClaim) {
    this.openDialog('edit', row);
  }

  handleDelete(row: InsuranceClaim) {
    const dialogRef = this.dialog.open(InsuranceClaimDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.insuranceService.deleteClaim(row.id);
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

  handleBulkDelete(selectedRows: InsuranceClaim[]) {
    selectedRows.forEach((row) => this.insuranceService.deleteClaim(row.id));
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: InsuranceClaim) {
    const dialogRef = this.dialog.open(InsuranceClaimFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { claim: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.insuranceService.addClaim(result);
        } else {
          this.insuranceService.updateClaim(result);
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
