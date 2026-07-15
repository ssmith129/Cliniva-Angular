import { Component, OnDestroy, OnInit, inject, viewChild , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ClinicalReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { ClinicalReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { ClinicalReportsService } from './clinical-reports.service';
import { ClinicalReport } from './clinical-reports.model';

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
  ChartComponent,
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
  selector: 'app-clinical-reports',
  templateUrl: './clinical-reports.component.html',
  styleUrls: ['./clinical-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class ClinicalReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  clinicalReportsService = inject(ClinicalReportsService);
  private snackBar = inject(MatSnackBar);

  readonly chart = viewChild.required<ChartComponent>('chart');
  public visitTrendsOptions!: Partial<ChartOptions>;
  public diseaseDistributionOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'doctorName', label: 'Doctor', type: 'text', visible: true },
    { def: 'diagnosis', label: 'Diagnosis', type: 'text', visible: true },
    { def: 'visitDate', label: 'Visit Date', type: 'date', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Recovered: 'badge badge-solid-green',
        'Under Treatment': 'badge badge-solid-blue',
        Critical: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ClinicalReport>([]);
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
    this.clinicalReportsService.getAllClinicalReports().subscribe({
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
    // Line Chart: Patient Visit Trends
    this.visitTrendsOptions = {
      series: [
        {
          name: 'Outpatients',
          data: [28, 29, 33, 36, 32, 32, 33, 45, 40, 45, 50, 48],
        },
        {
          name: 'Inpatients',
          data: [12, 11, 14, 18, 17, 13, 13, 20, 25, 22, 28, 30],
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Patient Visit Trends (2024)',
        align: 'left',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Number of Patients',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };

    // Pie Chart: Disease Distribution
    this.diseaseDistributionOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 300,
        type: 'pie',
      },
      labels: [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
      ],
      colors: ['#6777ef', '#ff9800', '#f44336', '#00bcd4', '#4caf50'],
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: ClinicalReport) {
    this.openDialog('edit', row);
  }

  handleDelete(row: ClinicalReport) {
    const dialogRef = this.dialog.open(ClinicalReportDeleteComponent, {
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

  handleBulkDelete(selectedRows: ClinicalReport[]) {
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

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: ClinicalReport) {
    const dialogRef = this.dialog.open(ClinicalReportsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { clinicalReport: data, action },
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
