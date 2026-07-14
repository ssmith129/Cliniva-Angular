import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PatientStatisticsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PatientStatisticDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { PatientStatisticsService } from './patient-statistics.service';
import { PatientStatistic } from './patient-statistics.model';
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
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class PatientStatisticsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientStatisticsService = inject(PatientStatisticsService);
  private snackBar = inject(MatSnackBar);

  public admissionTrendOptions!: Partial<ChartOptions>;
  public genderDistributionOptions!: Partial<ChartOptions>;
  public diagnosisDistributionOptions!: Partial<ChartOptions>;
  public ageGroupOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'patientName', label: 'Patient', type: 'nameWithImage', visible: true },
    { def: 'age', label: 'Age', type: 'text', visible: true },
    { def: 'gender', label: 'Gender', type: 'text', visible: true },
    { def: 'bloodGroup', label: 'Blood Group', type: 'text', visible: true },
    { def: 'diagnosis', label: 'Diagnosis', type: 'text', visible: true },
    { def: 'admissionDate', label: 'Admission Date', type: 'date', visible: true },
    { def: 'ward', label: 'Ward', type: 'text', visible: true },
    {
      def: 'status', label: 'Status', type: 'status', visible: true,
      statusBadgeMap: {
        'Admitted': 'badge badge-solid-blue',
        'Discharged': 'badge badge-solid-green',
        'Critical': 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientStatistic>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor() { this.initCharts(); }
  ngOnInit() { this.loadData(); }
  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  loadData() {
    this.isLoading = true;
    this.patientStatisticsService.getAllPatientStatistics().subscribe({
      next: (data) => { this.dataSource.data = data; this.isLoading = false; },
      error: (_err) => { this.isLoading = false; },
    });
  }

  initCharts() {
    this.admissionTrendOptions = {
      series: [
        { name: 'New Admissions', data: [125, 112, 138, 145, 162, 178, 168, 195, 182, 210, 198, 225] },
        { name: 'Discharges', data: [115, 108, 132, 138, 155, 172, 162, 188, 176, 202, 192, 218] },
      ],
      chart: { height: 300, type: 'area', toolbar: { show: false } },
      colors: ['#6777ef', '#4caf50'],
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05 } },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Patients' } },
      legend: { position: 'top' },
      title: { text: 'Monthly Admission vs Discharge Trend (2024)', align: 'left' },
    };

    this.genderDistributionOptions = {
      series: [58, 42],
      chart: { type: 'donut', height: 300 },
      labels: ['Male', 'Female'],
      colors: ['#6777ef', '#e91e63'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };

    this.diagnosisDistributionOptions = {
      series: [{ name: 'Patients', data: [285, 218, 192, 175, 162, 145, 138, 122, 115, 98] }],
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Hypertension', 'Diabetes', 'Cardiac Disease', 'Respiratory', 'Orthopaedic', 'Neurological', 'Kidney Disease', 'Cancer', 'Infectious', 'Others'],
        title: { text: 'Number of Patients' },
      },
      colors: ['#6777ef'],
      title: { text: 'Top 10 Diagnoses (2024)', align: 'left' },
    };

    this.ageGroupOptions = {
      series: [42, 88, 125, 198, 215, 172, 108, 52],
      chart: { type: 'pie', height: 300 },
      labels: ['0-10 yrs', '11-20 yrs', '21-30 yrs', '31-40 yrs', '41-50 yrs', '51-60 yrs', '61-70 yrs', '70+ yrs'],
      colors: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ff9800', '#f44336', '#9c27b0', '#3f51b5'],
      legend: { position: 'bottom' },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
    };
  }

  handleAdd() { this.openDialog('add'); }
  handleEdit(row: PatientStatistic) { this.openDialog('edit', row); }

  handleDelete(row: PatientStatistic) {
    const dialogRef = this.dialog.open(PatientStatisticDeleteComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: PatientStatistic[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() { this.loadData(); }

  openDialog(action: 'add' | 'edit', data?: PatientStatistic) {
    const dialogRef = this.dialog.open(PatientStatisticsFormComponent, {
      width: '60vw', maxWidth: '100vw',
      data: { patientStatistic: data, action }, autoFocus: false,
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
