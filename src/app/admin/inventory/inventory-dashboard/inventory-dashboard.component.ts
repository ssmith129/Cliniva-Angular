import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgApexchartsModule,
  ApexChart,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexTheme,
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TableCardComponent } from '@shared/components/table-card/table-card.component';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  colors: string[];
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  labels: string[];
};

export interface RecentTransaction {
  id: number;
  itemName: string;
  category: string;
  type: 'Check-In' | 'Check-Out';
  qty: number;
  date: string;
  user: string;
  badgeClass: string;
}

@Component({
  selector: 'app-inventory-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule,
    BreadcrumbComponent,
    TableCardComponent,
  ],
  templateUrl: './inventory-dashboard.component.html',
  styleUrls: ['./inventory-dashboard.component.scss'],
})
export class InventoryDashboardComponent implements OnInit {
  public donutChartOptions!: Partial<ChartOptions>;
  public areaChartOptions!: Partial<ChartOptions>;
  public smallChart4Options!: Partial<ChartOptions>;

  public transactionColumns = [
    { def: 'itemName', label: 'Item Name', type: 'text' },
    { def: 'category', label: 'Category', type: 'text' },
    { def: 'type', label: 'Transaction Type', type: 'text' },
    { def: 'qty', label: 'Quantity', type: 'text' },
    { def: 'date', label: 'Timestamp', type: 'text' },
    { def: 'user', label: 'Processed By', type: 'text' },
  ];

  totalStockValue = '$184,250.00';
  turnoverRatio = '4.2';
  safetyAlertsCount = 6;
  activeSuppliersCount = 12;

  recentTransactions: RecentTransaction[] = [];

  constructor() {
    this.initDonutChart();
    this.initAreaChart();
  }

  ngOnInit() {
    this.loadRecentTransactions();
  }

  initDonutChart() {
    this.donutChartOptions = {
      series: [45, 20, 15, 12, 8],
      labels: [
        'Pharmaceuticals',
        'Surgical Supplies',
        'PPE',
        'Lab Reagents',
        'IV Fluids',
      ],
      chart: {
        type: 'donut',
        height: 290,
      },
      legend: {
        position: 'bottom',
        labels: {
          colors: '#888',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return Math.round(Number(val)) + '%';
        },
      },
      colors: ['#2F80ED', '#27AE60', '#F2C94C', '#9B51E0', '#EB5757'],
    };
  }

  initAreaChart() {
    this.areaChartOptions = {
      series: [
        {
          name: 'Received Stock (Value)',
          data: [31000, 40000, 28000, 51000, 42000, 109000, 100000],
        },
        {
          name: 'Consumed Stock (Value)',
          data: [11000, 32000, 45000, 32000, 34000, 52000, 41000],
        },
      ],
      chart: {
        type: 'area',
        height: 275,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#888',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return '$' + val / 1000 + 'K';
          },
          style: {
            colors: '#888',
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#888',
        },
      },
      colors: ['#2f80ed', '#2196f3'],
    };
  }

  loadRecentTransactions() {
    this.recentTransactions = [
      {
        id: 1,
        itemName: 'N95 Respirator Masks',
        category: 'PPE',
        type: 'Check-Out',
        qty: 150,
        date: '2026-06-11 11:20 AM',
        user: 'Nurse Clara',
        badgeClass: 'badge badge-solid-orange',
      },
      {
        id: 2,
        itemName: 'Amoxicillin 500mg',
        category: 'Pharmaceuticals',
        type: 'Check-In',
        qty: 500,
        date: '2026-06-11 10:05 AM',
        user: 'Pharmacist Dave',
        badgeClass: 'badge badge-solid-green',
      },
      {
        id: 3,
        itemName: 'Surgical Gloves (Size M)',
        category: 'PPE',
        type: 'Check-Out',
        qty: 300,
        date: '2026-06-10 03:45 PM',
        user: 'Dr. Evelyn',
        badgeClass: 'badge badge-solid-orange',
      },
      {
        id: 4,
        itemName: 'Disposable Syringes (5ml)',
        category: 'Consumables',
        type: 'Check-In',
        qty: 1000,
        date: '2026-06-10 09:15 AM',
        user: 'Storekeeper Rob',
        badgeClass: 'badge badge-solid-green',
      },
      {
        id: 5,
        itemName: 'Saline IV Fluid 500ml',
        category: 'IV Fluids',
        type: 'Check-Out',
        qty: 80,
        date: '2026-06-09 02:10 PM',
        user: 'Nurse Sam',
        badgeClass: 'badge badge-solid-orange',
      },
    ];
  }
}
