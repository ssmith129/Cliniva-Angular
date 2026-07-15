import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { TechnicianAssignmentFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { TechnicianAssignmentDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { TechnicianAssignmentService } from './technician-assignment.service';
import { TechnicianAssignment } from './technician-assignment.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-technician-assignment',
  templateUrl: './technician-assignment.component.html',
  styleUrls: ['./technician-assignment.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class TechnicianAssignmentComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  technicianAssignmentService = inject(TechnicianAssignmentService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'technicianName',
      label: 'Technician',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'testName', label: 'Test Name', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true },
    {
      def: 'assignedDate',
      label: 'Assigned Date',
      type: 'date',
      visible: true,
    },
    {
      def: 'priority',
      label: 'Priority',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Low: 'badge badge-solid-green',
        Normal: 'badge badge-solid-blue',
        High: 'badge badge-solid-orange',
        Urgent: 'badge badge-solid-red',
      },
    },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Completed: 'badge badge-solid-green',
        Assigned: 'badge badge-solid-blue',
        Cancelled: 'badge badge-solid-orange',
        'In Progress': 'badge badge-solid-brown',
      },
    },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<TechnicianAssignment>([]);
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
    this.technicianAssignmentService.getAllTechnicianAssignments().subscribe({
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

  handleEdit(row: TechnicianAssignment) {
    this.openDialog('edit', row);
  }

  handleDelete(row: TechnicianAssignment) {
    const dialogRef = this.dialog.open(TechnicianAssignmentDeleteComponent, {
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

  openDialog(action: 'add' | 'edit', data?: TechnicianAssignment) {
    const dialogRef = this.dialog.open(TechnicianAssignmentFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { technicianAssignment: data, action },
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
