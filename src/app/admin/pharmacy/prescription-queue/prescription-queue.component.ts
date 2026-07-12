import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionDetailsComponent } from './dialogs/prescription-details/prescription-details.component';

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  date: string;
  items: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
}

@Component({
  selector: 'app-prescription-queue',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MasterTableComponent,
  ],
  templateUrl: './prescription-queue.component.html',
  styleUrls: ['./prescription-queue.component.scss'],
})
export class PrescriptionQueueComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  breadscrums = [
    {
      title: 'Prescription Queue',
      items: ['Pharmacy'],
      active: 'Prescription Queue',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'patientId', label: 'Patient ID', type: 'text', visible: true, sortable: true },
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true, sortable: true },
    { def: 'doctor', label: 'Prescribed By', type: 'text', visible: true, sortable: true },
    { def: 'date', label: 'Date', type: 'text', visible: true, sortable: true },
    { def: 'items', label: 'Medications', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      sortable: true,
      statusBadgeMap: {
        'Pending': 'badge col-orange',
        'Fulfilled': 'badge col-green',
        'Cancelled': 'badge col-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Prescription>([]);
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.dataSource.data = [
        { id: '1', patientId: 'PT-1002', patientName: 'John Miller', doctor: 'Dr. Robert', date: '2026-06-10', items: 'Paracetamol 500mg x20, Ibuprofen 400mg x10', status: 'Pending' },
        { id: '2', patientId: 'PT-1249', patientName: 'Sarah Connor', doctor: 'Dr. Taylor', date: '2026-06-10', items: 'Amoxicillin 250mg x15', status: 'Pending' },
        { id: '3', patientId: 'PT-1309', patientName: 'James Dean', doctor: 'Dr. Nancy', date: '2026-06-09', items: 'Atorvastatin 20mg x30, Metformin 850mg x60', status: 'Fulfilled' },
        { id: '4', patientId: 'PT-1152', patientName: 'Emily Stone', doctor: 'Dr. Lisa', date: '2026-06-09', items: 'Lisinopril 10mg x30', status: 'Fulfilled' },
        { id: '5', patientId: 'PT-1021', patientName: 'Bruce Wayne', doctor: 'Dr. Robert', date: '2026-06-08', items: 'Insulin Glargine x1', status: 'Cancelled' },
      ];
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 600);
  }

  handleFulfill(row: Prescription) {
    if (row.status === 'Fulfilled') {
      this.showNotification('Prescription is already fulfilled.', 'snackbar-warning');
      return;
    }
    if (row.status === 'Cancelled') {
      this.showNotification('Cannot fulfill a cancelled prescription.', 'snackbar-danger');
      return;
    }

    row.status = 'Fulfilled';
    this.dataSource.data = [...this.dataSource.data];
    this.showNotification(`Prescription for ${row.patientName} fulfilled successfully! Stock updated.`, 'snackbar-success');
    this.cdr.markForCheck();
  }

  handleCancel(row: Prescription) {
    if (row.status === 'Cancelled') {
      this.showNotification('Prescription is already cancelled.', 'snackbar-warning');
      return;
    }

    row.status = 'Cancelled';
    this.dataSource.data = [...this.dataSource.data];
    this.showNotification(`Prescription for ${row.patientName} has been cancelled.`, 'snackbar-danger');
    this.cdr.markForCheck();
  }

  handleDetails(row: Prescription) {
    const dialogRef = this.dialog.open(PrescriptionDetailsComponent, {
      width: '600px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'fulfill') {
          this.handleFulfill(result.data);
        } else if (result.action === 'cancel') {
          this.handleCancel(result.data);
        }
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  private showNotification(message: string, styleClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: styleClass,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
