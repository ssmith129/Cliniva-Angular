import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { PatientInsuranceDeleteComponent } from './dialogs/delete/delete.component';
import { AllPatientInsuranceFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PatientInsurance } from './patient-insurance.model';
import { PatientInsuranceService } from './patient-insurance.service';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-insurance',
  templateUrl: './patient-insurance.component.html',
  styleUrl: './patient-insurance.component.scss',
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PatientInsuranceComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientInsuranceService = inject(PatientInsuranceService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'insurance_id', label: 'Insurance ID', type: 'text', visible: true },
    { def: 'patient_id', label: 'Patient ID', type: 'text', visible: true },
    {
      def: 'insurance_company_name',
      label: 'Insurance Company Name',
      type: 'text',
      visible: true,
    },
    {
      def: 'insurance_policy_number',
      label: 'Insurance Policy Number',
      type: 'text',
      visible: true,
    },
    { def: 'policy_type', label: 'Policy Type', type: 'text', visible: true },
    {
      def: 'coverage_start_date',
      label: 'Coverage Start Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'coverage_end_date',
      label: 'Coverage End Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'coverage_amount',
      label: 'Coverage Amount',
      type: 'text',
      visible: true,
    },
    { def: 'co_payment', label: 'Co-payment', type: 'text', visible: true },
    {
      def: 'policy_holder_name',
      label: 'Policy Holder Name',
      type: 'text',
      visible: true,
    },
    { def: 'plan_type', label: 'Plan Type', type: 'text', visible: true },
    { def: 'benefits', label: 'Benefits', type: 'text', visible: false },
    {
      def: 'insurance_status',
      label: 'Insurance Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge badge-solid-green',
        Inactive: 'badge badge-solid-orange',
      },
    },
    {
      def: 'claim_limit',
      label: 'Claim Limit',
      type: 'text',
      visible: false,
    },
    { def: 'remarks', label: 'Remarks', type: 'text', visible: false },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientInsurance>([]);
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
    this.patientInsuranceService.getAllPatientInsurance().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        this.dataSource.filterPredicate = (
          data: PatientInsurance,
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

  handleEdit(row: PatientInsurance) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PatientInsurance) {
    const dialogRef = this.dialog.open(PatientInsuranceDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.insurance_id !== row.insurance_id
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

  handleBulkDelete(selectedRows: PatientInsurance[]) {
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

  openDialog(action: 'add' | 'edit', data?: PatientInsurance) {
    const dialogRef = this.dialog.open(AllPatientInsuranceFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patientInsurance: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.insurance_id === result.insurance_id
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
