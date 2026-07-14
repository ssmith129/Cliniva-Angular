import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PharmacyReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PharmacyReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { PharmacyReportsService } from './pharmacy-reports.service';
import { PharmacyReport } from './pharmacy-reports.model';
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
  selector: 'app-pharmacy-reports',
  templateUrl: './pharmacy-reports.component.html',
  styleUrls: ['./pharmacy-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class PharmacyReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  pharmacyReportsService = inject(PharmacyReportsService);
  private snackBar = inject(MatSnackBar);

  public salesTrendOptions!: Partial<ChartOptions>;
  public categoryRevenueOptions!: Partial<ChartOptions>;
  public stockStatusOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'medicineName', label: 'Medicine Name', type: 'text', visible: true },
    { def: 'category', label: 'Category', type: 'text', visible: true },
    { def: 'unitsSold', label: 'Units Sold', type: 'text', visible: true },
    { def: 'revenue', label: 'Revenue ($)', type: 'text', visible: true },
    { def: 'expiryDate', label: 'Expiry Date', type: 'date', visible: true },
    {
      def: 'status', label: 'Status', type: 'status', visible: true,
      statusBadgeMap: {
        'In Stock': 'badge badge-solid-green',
        'Low Stock': 'badge badge-solid-orange',
        'Near Expiry': 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PharmacyReport>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor() { this.initCharts(); }

  ngOnInit() { this.loadData(); }
  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  loadData() {
    this.isLoading = true;
    this.pharmacyReportsService.getAllPharmacyReports().subscribe({
      next: (data) => { this.dataSource.data = data; this.isLoading = false; },
      error: (_err) => { this.isLoading = false; },
    });
  }

  initCharts() {
    this.salesTrendOptions = {
      series: [
        { name: 'Sales Revenue ($)', data: [28400, 32100, 29800, 35600, 38200, 42000, 39500, 45800, 43200, 51000, 48700, 55300] },
        { name: 'Units Sold', data: [4200, 4800, 4500, 5100, 5400, 5900, 5600, 6300, 5900, 7100, 6700, 7500] },
      ],
      chart: { height: 300, type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 4 } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Value' } },
      fill: { opacity: 1 },
      colors: ['#6777ef', '#4caf50'],
      legend: { position: 'top' },
      title: { text: 'Monthly Pharmacy Sales (2024)', align: 'left' },
    };

    this.categoryRevenueOptions = {
      series: [35, 25, 20, 12, 8],
      chart: { type: 'donut', height: 300 },
      labels: ['Antibiotics', 'Analgesics', 'Antidiabetics', 'Cardiovascular', 'Others'],
      colors: ['#6777ef', '#ff9800', '#f44336', '#00bcd4', '#4caf50'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };

    this.stockStatusOptions = {
      series: [{ name: 'Quantity', data: [1240, 680, 920, 560, 740, 1100, 430, 820, 310, 180] }],
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Paracetamol','Amoxicillin','Metformin','Atorvastatin','Omeprazole','Ibuprofen','Amlodipine','Cetirizine','Azithromycin','Insulin'],
        title: { text: 'Units Sold' },
      },
      colors: ['#6777ef'],
      title: { text: 'Top Medicines by Sales Volume', align: 'left' },
    };
  }

  handleAdd() { this.openDialog('add'); }
  handleEdit(row: PharmacyReport) { this.openDialog('edit', row); }

  handleDelete(row: PharmacyReport) {
    const dialogRef = this.dialog.open(PharmacyReportDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: PharmacyReport[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() { this.loadData(); }

  openDialog(action: 'add' | 'edit', data?: PharmacyReport) {
    const dialogRef = this.dialog.open(PharmacyReportsFormComponent, {
      width: '60vw', maxWidth: '100vw',
      data: { pharmacyReport: data, action }, autoFocus: false,
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
