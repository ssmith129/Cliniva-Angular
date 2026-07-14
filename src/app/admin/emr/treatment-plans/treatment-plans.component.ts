import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TreatmentPlan } from './treatment-plans.model';
import { TreatmentPlansService } from './treatment-plans.service';
import { TreatmentPlansFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { TreatmentPlansDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-treatment-plans',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
  templateUrl: './treatment-plans.component.html',
  styleUrl: './treatment-plans.component.scss',
})
export class TreatmentPlansComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private treatmentPlansService = inject(TreatmentPlansService);

  breadscrums = [
    {
      title: 'Treatment Plans',
      items: ['EMR'],
      active: 'Treatment Plans',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'doctorName', label: 'Doctor', type: 'text', visible: true },
    { def: 'diagnosis', label: 'Diagnosis', type: 'text', visible: true },
    { def: 'treatment', label: 'Treatment', type: 'text', visible: true },
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
        'On Hold': 'badge badge-solid-orange',
        Discontinued: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<TreatmentPlan>([]);
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.treatmentPlansService.getAllTreatmentPlans().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  openDialog(action: 'add' | 'edit', data?: TreatmentPlan) {
    const dialogRef = this.dialog.open(TreatmentPlansFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { treatmentPlan: data, action },
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

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: TreatmentPlan) {
    this.openDialog('edit', row);
  }

  handleRefresh() {
    this.loadData();
  }

  handleDelete(row: TreatmentPlan) {
    const dialogRef = this.dialog.open(TreatmentPlansDeleteComponent, {
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