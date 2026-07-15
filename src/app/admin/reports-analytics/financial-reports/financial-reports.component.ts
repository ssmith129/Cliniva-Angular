import { Component, OnDestroy, OnInit, inject, viewChild , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { FinancialReportsFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { FinancialReportDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { FinancialReportsService } from './financial-reports.service';
import { FinancialReport } from './financial-reports.model';

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
  selector: 'app-financial-reports',
  templateUrl: './financial-reports.component.html',
  styleUrls: ['./financial-reports.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent, NgApexchartsModule],
})
export class FinancialReportsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  financialReportsService = inject(FinancialReportsService);
  private snackBar = inject(MatSnackBar);

  readonly chart = viewChild.required<ChartComponent>('chart');
  public revenueExpensesOptions!: Partial<ChartOptions>;
  public departmentRevenueOptions!: Partial<ChartOptions>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    {
      def: 'transactionId',
      label: 'Transaction ID',
      type: 'text',
      visible: true,
    },
    { def: 'description', label: 'Description', type: 'text', visible: true },
    { def: 'amount', label: 'Amount', type: 'text', visible: true },
    {
      def: 'type',
      label: 'Type',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Income: 'badge badge-solid-green',
        Expense: 'badge badge-solid-red',
      },
    },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Completed: 'badge badge-solid-green',
        Pending: 'badge badge-solid-orange',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<FinancialReport>([]);
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
    this.financialReportsService.getAllFinancialReports().subscribe({
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
    // Bar Chart: Revenue vs Expenses
    this.revenueExpensesOptions = {
      series: [
        {
          name: 'Income',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Expense',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
      colors: ['#6777ef', '#fc544b'],
    };

    // Donut Chart: Revenue by Department
    this.departmentRevenueOptions = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut',
        height: 300,
      },
      labels: [
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'General',
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

  handleEdit(row: FinancialReport) {
    this.openDialog('edit', row);
  }

  handleDelete(row: FinancialReport) {
    const dialogRef = this.dialog.open(FinancialReportDeleteComponent, {
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

  handleBulkDelete(selectedRows: FinancialReport[]) {
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

  openDialog(action: 'add' | 'edit', data?: FinancialReport) {
    const dialogRef = this.dialog.open(FinancialReportsFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { financialReport: data, action },
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
