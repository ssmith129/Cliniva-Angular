import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { HrReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { HrReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { HrReportsService } from './hr-reports.service';
import { HrReport } from './hr-reports.model';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexResponsive,
  ApexGrid,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | number[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  colors: string[];
  labels: string[];
  responsive: ApexResponsive[];
  grid: ApexGrid;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hr-reports',
  templateUrl: './hr-reports.component.html',
  styleUrls: ['./hr-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class HrReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  hrReportsService = inject(HrReportsService);
  private snackBar = inject(MatSnackBar);

  public attendanceOverviewOptions!: Partial<ChartOptions>;
  public departmentHeadcountOptions!: Partial<ChartOptions>;
  public payrollBreakdownOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'employeeName', label: 'Employee', type: 'nameWithImage', visible: true },
    { def: 'department', label: 'Department', type: 'text', visible: true },
    { def: 'designation', label: 'Designation', type: 'text', visible: true },
    { def: 'presentDays', label: 'Present Days', type: 'text', visible: true },
    { def: 'absentDays', label: 'Absent Days', type: 'text', visible: true },
    {
      def: 'paymentStatus',
      label: 'Payment Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        'Paid': 'badge badge-solid-green',
        'Pending': 'badge badge-solid-orange',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<HrReport>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor() {
    this.initCharts();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.hrReportsService.getAllHrReports().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (_err) => {
        this.isLoading = false;
      },
    });
  }

  initCharts() {
    // Line Chart: Monthly Attendance Overview
    this.attendanceOverviewOptions = {
      series: [
        { name: 'Present', data: [92, 88, 95, 90, 87, 93, 91, 89, 94, 96, 90, 88] },
        { name: 'Absent', data: [8, 12, 5, 10, 13, 7, 9, 11, 6, 4, 10, 12] },
        { name: 'On Leave', data: [5, 8, 6, 7, 9, 5, 6, 8, 5, 4, 7, 9] },
      ],
      chart: { height: 300, type: 'line', toolbar: { show: false } },
      colors: ['#4caf50', '#f44336', '#ff9800'],
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        title: { text: 'Month' },
      },
      yaxis: { title: { text: 'Number of Employees' } },
      legend: { position: 'top', horizontalAlign: 'right' },
      title: { text: 'Monthly Attendance Overview (2024)', align: 'left' },
    };

    // Bar Chart: Department Headcount
    this.departmentHeadcountOptions = {
      series: [{ name: 'Headcount', data: [18, 12, 15, 9, 22, 14, 8, 11, 6, 7] }],
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      dataLabels: { enabled: true },
      xaxis: {
        categories: ['Cardiology','Neurology','Orthopedics','Pediatrics','General Medicine','Nursing','Laboratory','Pharmacy','Radiology','Administration'],
        title: { text: 'Staff Count' },
      },
      colors: ['#6777ef'],
      title: { text: 'Department Headcount', align: 'left' },
    };

    // Donut Chart: Payroll Breakdown
    this.payrollBreakdownOptions = {
      series: [42, 28, 15, 10, 5],
      chart: { type: 'donut', height: 300 },
      labels: ['Doctors', 'Nurses', 'Technicians', 'Admin Staff', 'Support Staff'],
      colors: ['#6777ef', '#4caf50', '#ff9800', '#00bcd4', '#9c27b0'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };
  }

  handleAdd() { this.openDialog('add'); }
  handleEdit(row: HrReport) { this.openDialog('edit', row); }

  handleDelete(row: HrReport) {
    const dialogRef = this.dialog.open(HrReportDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: HrReport[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() { this.loadData(); }

  openDialog(action: 'add' | 'edit', data?: HrReport) {
    const dialogRef = this.dialog.open(HrReportsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { hrReport: data, action },
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
          'bottom', 'center'
        );
      }
    });
  }

  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition) {
    this.snackBar.open(text, '', { duration: 2000, verticalPosition: placementFrom, horizontalPosition: placementAlign, panelClass: colorName });
  }
}
