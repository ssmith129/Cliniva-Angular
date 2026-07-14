import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { LabReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { LabReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { LabAnalyticsReportsService } from './lab-reports.service';
import { LabAnalyticsReport } from './lab-reports.model';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexStroke, ApexTitleSubtitle, ApexYAxis, ApexFill, ApexLegend, ApexPlotOptions, NgApexchartsModule, ApexResponsive, ApexGrid } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | number[];
  chart: ApexChart; xaxis: ApexXAxis; yaxis: ApexYAxis; title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels; stroke: ApexStroke; fill: ApexFill; tooltip: ApexTooltip;
  legend: ApexLegend; plotOptions: ApexPlotOptions; colors: string[]; labels: string[];
  responsive: ApexResponsive[]; grid: ApexGrid;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-reports',
  templateUrl: './lab-reports.component.html',
  styleUrls: ['./lab-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class LabReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  labReportsService = inject(LabAnalyticsReportsService);
  private snackBar = inject(MatSnackBar);

  public testVolumeOptions!: Partial<ChartOptions>;
  public categoryDistributionOptions!: Partial<ChartOptions>;
  public tatDistributionOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'patientName', label: 'Patient', type: 'nameWithImage', visible: true },
    { def: 'testName', label: 'Test Name', type: 'text', visible: true },
    { def: 'testCategory', label: 'Category', type: 'text', visible: true },
    { def: 'requestedBy', label: 'Requested By', type: 'text', visible: true },
    { def: 'sampleDate', label: 'Sample Date', type: 'date', visible: true },
    { def: 'tat', label: 'TAT', type: 'text', visible: true },
    {
      def: 'status', label: 'Status', type: 'status', visible: true,
      statusBadgeMap: {
        'Completed': 'badge badge-solid-green',
        'Pending': 'badge badge-solid-orange',
        'In Progress': 'badge badge-solid-blue',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<LabAnalyticsReport>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor() { this.initCharts(); }
  ngOnInit() { this.loadData(); }
  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  loadData() {
    this.isLoading = true;
    this.labReportsService.getAllLabReports().subscribe({
      next: (data) => { this.dataSource.data = data; this.isLoading = false; },
      error: (_err) => { this.isLoading = false; },
    });
  }

  initCharts() {
    this.testVolumeOptions = {
      series: [
        { name: 'Hematology', data: [320, 298, 345, 312, 368, 395, 378, 412, 388, 435, 418, 460] },
        { name: 'Biochemistry', data: [280, 265, 310, 295, 325, 348, 332, 365, 342, 390, 375, 410] },
        { name: 'Microbiology', data: [85, 78, 92, 88, 95, 102, 98, 110, 105, 118, 112, 125] },
        { name: 'Serology', data: [140, 128, 155, 145, 162, 175, 168, 188, 178, 198, 190, 212] },
      ],
      chart: { height: 300, type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 2 } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Tests Performed' } },
      fill: { opacity: 1 },
      colors: ['#6777ef', '#4caf50', '#ff9800', '#f44336'],
      legend: { position: 'top' },
      title: { text: 'Monthly Test Volume by Category (2024)', align: 'left' },
    };

    this.categoryDistributionOptions = {
      series: [38, 32, 15, 10, 5],
      chart: { type: 'donut', height: 300 },
      labels: ['Hematology', 'Biochemistry', 'Serology', 'Microbiology', 'Molecular'],
      colors: ['#6777ef', '#4caf50', '#ff9800', '#f44336', '#9c27b0'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };

    this.tatDistributionOptions = {
      series: [{ name: 'Tests', data: [45, 280, 195, 82, 38, 12] }],
      chart: { type: 'bar', height: 250, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 4 } },
      dataLabels: { enabled: true },
      xaxis: {
        categories: ['< 1 hr', '1-4 hrs', '4-12 hrs', '12-24 hrs', '24-48 hrs', '> 48 hrs'],
        title: { text: 'TAT Range' },
      },
      yaxis: { title: { text: 'Number of Tests' } },
      colors: ['#6777ef'],
      title: { text: 'TAT Distribution (Nov 2024)', align: 'left' },
    };
  }

  handleAdd() { this.openDialog('add'); }
  handleEdit(row: LabAnalyticsReport) { this.openDialog('edit', row); }

  handleDelete(row: LabAnalyticsReport) {
    const dialogRef = this.dialog.open(LabReportDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: LabAnalyticsReport[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() { this.loadData(); }

  openDialog(action: 'add' | 'edit', data?: LabAnalyticsReport) {
    const dialogRef = this.dialog.open(LabReportsFormComponent, {
      width: '60vw', maxWidth: '100vw',
      data: { labReport: data, action }, autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex((record) => record.id === result.id);
          if (index !== -1) { this.dataSource.data[index] = result; this.dataSource._updateChangeSubscription(); }
        }
        this.showNotification(action === 'add' ? 'snackbar-success' : 'black', `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`, 'bottom', 'center');
      }
    });
  }

  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition) {
    this.snackBar.open(text, '', { duration: 2000, verticalPosition: placementFrom, horizontalPosition: placementAlign, panelClass: colorName });
  }
}
