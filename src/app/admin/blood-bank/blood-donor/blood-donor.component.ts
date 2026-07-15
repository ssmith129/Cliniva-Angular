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
import { BloodDonorDeleteComponent } from './dialogs/delete/delete.component';
import { BloodDonorFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { BloodDonor } from './blood-donor.model';
import { BloodDonorService } from './blood-donor.service';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blood-donor',
  templateUrl: './blood-donor.component.html',
  styleUrl: './blood-donor.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class BloodDonorComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  bloodDonorService = inject(BloodDonorService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'donorId', label: 'Donor ID', type: 'text', visible: true },
    { def: 'donorName', label: 'Donor Name', type: 'nameWithImage', visible: true },
    { def: 'dateOfBirth', label: 'Date of Birth', type: 'date', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'bloodType', label: 'Blood Type', type: 'text', visible: true },
    { def: 'address', label: 'Address', type: 'address', visible: false },
    { def: 'phoneNumber', label: 'Phone Number', type: 'phone', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'donorStatus', label: 'Donor Status', type: 'text', visible: true },
    {
      def: 'lastDonationDate',
      label: 'Last Donation Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'nextEligibleDonationDate',
      label: 'Next Eligible Donation Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'donationFrequency',
      label: 'Donation Frequency',
      type: 'text',
      visible: false,
    },
    {
      def: 'healthStatus',
      label: 'Health Status',
      type: 'text',
      visible: false,
    },
    {
      def: 'donationHistory',
      label: 'Donation History',
      type: 'text',
      visible: false,
    },
    {
      def: 'donorCategory',
      label: 'Donor Category',
      type: 'text',
      visible: false,
    },
    {
      def: 'donorIdentificationNumber',
      label: 'Donor Identification Number',
      type: 'text',
      visible: false,
    },
    {
      def: 'medicalHistory',
      label: 'Medical History',
      type: 'text',
      visible: false,
    },
    {
      def: 'emergencyContactPhone',
      label: 'Emergency Contact Phone',
      type: 'text',
      visible: false,
    },
    {
      def: 'registrationDate',
      label: 'Registration Date',
      type: 'date',
      visible: false,
    },
    {
      def: 'donorLocation',
      label: 'Donor Location',
      type: 'text',
      visible: true,
    },
    { def: 'donorNotes', label: 'Donor Notes', type: 'text', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<BloodDonor>([]);
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
    this.bloodDonorService.getAllBloodDonors().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (data: BloodDonor, filter: string) =>
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

  handleEdit(row: BloodDonor) {
    this.openDialog('edit', row);
  }

  handleDelete(row: BloodDonor) {
    const dialogRef = this.dialog.open(BloodDonorDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.donorId !== row.donorId
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

  handleBulkDelete(selectedRows: BloodDonor[]) {
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

  openDialog(action: 'add' | 'edit', data?: BloodDonor) {
    const dialogRef = this.dialog.open(BloodDonorFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { bloodDonor: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.donorId === result.donorId
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
