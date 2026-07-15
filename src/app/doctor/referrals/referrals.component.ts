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
import { ReferralsService } from './referrals.service';
import { Referral } from './referrals.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ReferralFormComponent } from './dialog/form-dialog/form-dialog.component';
import { ReferralDeleteComponent } from './dialog/delete/delete.component';

import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [BreadcrumbComponent, MasterTableComponent],
  standalone: true,
})
export class ReferralsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  referralsService = inject(ReferralsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'referralId', label: 'Referral ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'referredTo', label: 'Referred To', type: 'text', visible: true },
    { def: 'specialty', label: 'Specialty', type: 'text', visible: true },
    {
      def: 'referralDate',
      label: 'Date',
      type: 'date',
      visible: true,
    },
    { def: 'reason', label: 'Reason', type: 'text', visible: true },
    {
      def: 'priority',
      label: 'Priority',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Routine: 'badge-solid-blue',
        Urgent: 'badge-solid-red',
      },
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Accepted: 'badge-solid-green',
        Pending: 'badge-solid-orange',
        Completed: 'badge-solid-blue',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Referral>([]);
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
    this.referralsService.getAllReferrals().subscribe({
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

  handleEdit(row: Referral) {
    this.openDialog('edit', row);
  }

  handleDelete(row: Referral) {
    const dialogRef = this.dialog.open(ReferralDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.referralsService.deleteReferral(row.id);
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

  handleBulkDelete(selectedRows: Referral[]) {
    selectedRows.forEach((row) => this.referralsService.deleteReferral(row.id));
    this.loadData();
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: Referral) {
    const dialogRef = this.dialog.open(ReferralFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { referral: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.referralsService.addReferral(result);
        } else {
          this.referralsService.updateReferral(result);
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
