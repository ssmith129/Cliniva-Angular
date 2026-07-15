import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { MedicationHistory } from './medication-history.model';
import { MedicationHistoryService } from './medication-history.service';
import { MedicationHistoryFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { MedicationHistoryDeleteComponent } from './dialogs/delete/delete.component';

import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-medication-history',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
  templateUrl: './medication-history.component.html',
  styleUrl: './medication-history.component.scss',
})
export class MedicationHistoryComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private medicationHistoryService = inject(MedicationHistoryService);

  breadscrums = [
    {
      title: 'Medication History',
      items: ['EMR'],
      active: 'Medication History',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'medicationId',
      label: 'Medication ID',
      type: 'text',
      visible: true,
    },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'drugName', label: 'Drug Name', type: 'text', visible: true },
    { def: 'dosage', label: 'Dosage', type: 'text', visible: true },
    { def: 'frequency', label: 'Frequency', type: 'text', visible: true },
    {
      def: 'prescribedBy',
      label: 'Prescribed By',
      type: 'text',
      visible: true,
    },
    { def: 'startDate', label: 'Start Date', type: 'date', visible: true },
    { def: 'endDate', label: 'End Date', type: 'date', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge badge-solid-green',
        Completed: 'badge badge-solid-blue',
        Discontinued: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<MedicationHistory>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.medicationHistoryService.getAllMedicationHistory().subscribe({
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

  handleEdit(row: MedicationHistory) {
    this.openDialog('edit', row);
  }

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: MedicationHistory) {
    const dialogRef = this.dialog.open(MedicationHistoryFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { medicationHistory: data, action },
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

  handleDelete(row: MedicationHistory) {
    const dialogRef = this.dialog.open(MedicationHistoryDeleteComponent, {
      width: '400px',
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

  showNotification(
    colorName: string,
    text: string,
    placementFrom: 'top' | 'bottom',
    placementAlign: 'start' | 'center' | 'end'
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
