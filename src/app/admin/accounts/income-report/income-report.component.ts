import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
  ApexResponsive,
  ApexPlotOptions,
  ApexFill,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  grid: ApexGrid;
  colors: string[];
};

export interface DepartmentRevenue {
  department: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  yearly: number;
}

export interface FormattedDepartmentRevenue {
  department: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
  yearly: string;
}

interface DepartmentData {
  year: number;
  data: DepartmentRevenue[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-income-report',
    imports: [
        BreadcrumbComponent,
        MatCardModule,
        MatSelectModule,
        NgApexchartsModule,
        MatTableModule,
        MasterTableComponent
    ],
    templateUrl: './income-report.component.html',
    styleUrl: './income-report.component.scss'
})
export class IncomeReportComponent implements OnInit {
  private http = inject(HttpClient);

  public areaChartOptions!: Partial<ChartOptions>;
  selectedTimePeriod: string = 'Monthly'; // Default value
  selectedYear: number = 2024; // Default year
  availableYears: number[] = [2020, 2021, 2022, 2023, 2024];
  departmentData: DepartmentData[] = [];
  isLoading = false;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'department', label: 'Department', type: 'text', visible: true, sortable: true },
    { def: 'jan', label: 'Jan', type: 'text', visible: true, sortable: true },
    { def: 'feb', label: 'Feb', type: 'text', visible: true, sortable: true },
    { def: 'mar', label: 'Mar', type: 'text', visible: true, sortable: true },
    { def: 'apr', label: 'Apr', type: 'text', visible: true, sortable: true },
    { def: 'may', label: 'May', type: 'text', visible: true, sortable: true },
    { def: 'jun', label: 'Jun', type: 'text', visible: true, sortable: true },
    { def: 'jul', label: 'Jul', type: 'text', visible: true, sortable: true },
    { def: 'aug', label: 'Aug', type: 'text', visible: true, sortable: true },
    { def: 'sep', label: 'Sep', type: 'text', visible: true, sortable: true },
    { def: 'oct', label: 'Oct', type: 'text', visible: true, sortable: true },
    { def: 'nov', label: 'Nov', type: 'text', visible: true, sortable: true },
    { def: 'dec', label: 'Dec', type: 'text', visible: true, sortable: true },
    { def: 'yearly', label: 'Yearly', type: 'text', visible: true, sortable: true },
  ];
  dataSource: MatTableDataSource<FormattedDepartmentRevenue> = new MatTableDataSource<FormattedDepartmentRevenue>([]);

  constructor() {
    this.chart1();
  }

  ngOnInit() {
    this.loadDepartmentData();
  }

  loadDepartmentData() {
    this.isLoading = true;
    this.http
      .get<{ departments: DepartmentData[] }>('assets/data/income-report.json')
      .subscribe({
        next: (data) => {
          this.departmentData = data.departments;
          this.availableYears = this.departmentData.map((item) => item.year);
          this.updateTableData();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  updateTableData() {
    const yearData = this.departmentData.find(
      (item) => item.year === this.selectedYear
    );
    if (yearData) {
      const formattedData: FormattedDepartmentRevenue[] = yearData.data.map(row => ({
        department: row.department,
        jan: this.formatCurrency(row.jan),
        feb: this.formatCurrency(row.feb),
        mar: this.formatCurrency(row.mar),
        apr: this.formatCurrency(row.apr),
        may: this.formatCurrency(row.may),
        jun: this.formatCurrency(row.jun),
        jul: this.formatCurrency(row.jul),
        aug: this.formatCurrency(row.aug),
        sep: this.formatCurrency(row.sep),
        oct: this.formatCurrency(row.oct),
        nov: this.formatCurrency(row.nov),
        dec: this.formatCurrency(row.dec),
        yearly: this.formatCurrency(row.yearly)
      }));
      this.dataSource.data = formattedData;
    }
  }

  onYearChange(event: { value: string | number }) {
    this.selectedYear = typeof event.value === 'string' ? parseInt(event.value, 10) : event.value;
    this.updateTableData();
    this.chart1(); // Update chart if needed
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  onTimePeriodChange(_event: { value: string | number }): void {
    // Using _event parameter to satisfy linting
    this.chart1();
  }

  handleRefresh() {
    this.loadDepartmentData();
  }

  private chart1() {
    let categories: string[] = [];
    let incomeData: number[] = [];

    switch (this.selectedTimePeriod) {
      case 'Daily':
        categories = [
          '2024-11-01',
          '2024-11-02',
          '2024-11-03',
          '2024-11-04',
          '2024-11-05',
          '2024-11-06',
          '2024-11-07',
        ];
        incomeData = [5, 8, 6, 4, 7, 9, 10];
        break;

      case 'Monthly':
        categories = [
          '2024-01',
          '2024-02',
          '2024-03',
          '2024-04',
          '2024-05',
          '2024-06',
          '2024-07',
        ];
        incomeData = [31, 40, 28, 51, 42, 85, 77];
        break;

      case 'Yearly':
        categories = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
        incomeData = [200, 250, 300, 450, 600, 700, 800];
        break;
    }

    this.areaChartOptions = {
      series: [
        {
          name: 'Income',
          data: incomeData,
        },
      ],
      chart: {
        height: 250,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#407fe4'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: categories,
        labels: {
          show: true,
          offsetX: 20,
          offsetY: 0,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
