import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { RadiologyReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { RadiologyReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { RadiologyReportsService } from './radiology-reports.service';
import { RadiologyReport } from './radiology-reports.model';
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
  selector: 'app-radiology-reports',
  templateUrl: './radiology-reports.component.html',
  styleUrls: ['./radiology-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class RadiologyReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  radiologyReportsService = inject(RadiologyReportsService);
  private snackBar = inject(MatSnackBar);

  public scanVolumeOptions!: Partial<ChartOptions>;
  public modalityDistributionOptions!: Partial<ChartOptions>;
  public tatTrendOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'patientName', label: 'Patient', type: 'nameWithImage', visible: true },
    { def: 'scanType', label: 'Scan Type', type: 'text', visible: true },
    { def: 'modality', label: 'Modality', type: 'text', visible: true },
    { def: 'referredBy', label: 'Referred By', type: 'text', visible: true },
    { def: 'reportDate', label: 'Report Date', type: 'date', visible: true },
    { def: 'tat', label: 'TAT', type: 'text', visible: true },
    {
      def: 'status', label: 'Status', type: 'status', visible: true,
      statusBadgeMap: {
        'Reported': 'badge badge-solid-green',
        'Pending': 'badge badge-solid-orange',
        'Reviewed': 'badge badge-solid-blue',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<RadiologyReport>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor() { this.initCharts(); }
  ngOnInit() { this.loadData(); }
  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  loadData() {
    this.isLoading = true;
    this.radiologyReportsService.getAllRadiologyReports().subscribe({
      next: (data) => { this.dataSource.data = data; this.isLoading = false; },
      error: (_err) => { this.isLoading = false; },
    });
  }

  initCharts() {
    this.scanVolumeOptions = {
      series: [
        { name: 'X-Ray', data: [145, 132, 168, 155, 172, 190, 178, 205, 195, 220, 210, 235] },
        { name: 'CT Scan', data: [62, 58, 75, 70, 82, 88, 79, 95, 88, 102, 95, 110] },
        { name: 'MRI', data: [38, 42, 48, 52, 58, 65, 60, 72, 68, 78, 72, 85] },
        { name: 'Ultrasound', data: [92, 88, 105, 98, 112, 120, 108, 128, 118, 135, 128, 148] },
      ],
      chart: { height: 300, type: 'line', toolbar: { show: false } },
      colors: ['#6777ef', '#ff9800', '#f44336', '#4caf50'],
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Scans Performed' } },
      legend: { position: 'top' },
      title: { text: 'Monthly Scan Volume by Modality (2024)', align: 'left' },
    };

    this.modalityDistributionOptions = {
      series: [37, 20, 14, 18, 11],
      chart: { type: 'pie', height: 300 },
      labels: ['X-Ray', 'Ultrasound', 'CT Scan', 'MRI', 'PET/Mammography'],
      colors: ['#6777ef', '#4caf50', '#ff9800', '#f44336', '#9c27b0'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };

    this.tatTrendOptions = {
      series: [
        { name: 'X-Ray TAT (hrs)', data: [2.1, 1.8, 2.3, 2.0, 1.9, 2.2, 1.7, 2.0, 1.8, 2.1, 1.9, 2.0] },
        { name: 'CT TAT (hrs)', data: [4.5, 4.2, 5.0, 4.8, 4.3, 4.7, 4.1, 4.6, 4.4, 4.9, 4.6, 4.8] },
        { name: 'MRI TAT (hrs)', data: [7.2, 6.8, 7.8, 7.5, 7.0, 7.4, 6.9, 7.3, 7.0, 7.6, 7.2, 7.5] },
      ],
      chart: { height: 250, type: 'area', toolbar: { show: false } },
      colors: ['#6777ef', '#ff9800', '#f44336'],
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05 } },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Hours' } },
      legend: { position: 'top' },
      title: { text: 'Average TAT Trend by Modality', align: 'left' },
    };
  }

  handleAdd() { this.openDialog('add'); }
  handleEdit(row: RadiologyReport) { this.openDialog('edit', row); }

  handleDelete(row: RadiologyReport) {
    const dialogRef = this.dialog.open(RadiologyReportDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: RadiologyReport[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() { this.loadData(); }

  openDialog(action: 'add' | 'edit', data?: RadiologyReport) {
    const dialogRef = this.dialog.open(RadiologyReportsFormComponent, {
      width: '60vw', maxWidth: '100vw',
      data: { radiologyReport: data, action }, autoFocus: false,
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
