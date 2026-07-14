import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { NgScrollbar } from 'ngx-scrollbar';

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  colors: string[];
};

export type donutChartOptions = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};

export type sparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
  fill: ApexFill;
};

export type radialChartOptions = {
  series: number[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  labels: string[];
  colors: string[];
};

export interface LowStockItem {
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  status: 'critical' | 'warning' | 'ordering';
  reorderStatus: string;
}

export interface StaffMember {
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  shift: string;
  status: 'online' | 'break' | 'offline';
  phone: string;
}

export interface SupplierOrder {
  id: string;
  supplier: string;
  items: string;
  amount: string;
  orderDate: string;
  expectedDelivery: string;
  statusClass: string;
  status: string;
  icon: string;
}

@Component({
  selector: 'app-pharmacy-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    NgScrollbar,
  ],
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrls: ['./pharmacy-dashboard.component.scss'],
})
export class PharmacyDashboardComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private sensorInterval: ReturnType<typeof setInterval> | null = null;

  breadscrums = [
    {
      title: 'Pharmacy Dashboard',
      items: ['Pharmacy'],
      active: 'Dashboard',
    },
  ];

  // ─── KPI Data ────────────────────────────────────────────────
  kpiCards = [
    {
      label: 'Daily Revenue',
      value: '$12,840',
      trend: '+8.2%',
      trendUp: true,
      sub: 'vs. yesterday',
      icon: 'monetization_on',
      iconBg: 'bg-soft-blue',
      iconColor: 'text-blue',
      sparkColor: '#2196F3',
      sparkData: [900, 1100, 1050, 1300, 1200, 1500, 1840],
    },
    {
      label: 'Prescriptions Today',
      value: '284',
      trend: '+12.4%',
      trendUp: true,
      sub: 'vs. yesterday',
      icon: 'receipt_long',
      iconBg: 'bg-soft-green',
      iconColor: 'text-green',
      sparkColor: '#66BB6A',
      sparkData: [180, 200, 190, 240, 220, 260, 284],
    },
    {
      label: 'Low Stock Alerts',
      value: '14 Items',
      trend: '3 Critical',
      trendUp: false,
      sub: 'Needs attention',
      icon: 'warning_amber',
      iconBg: 'bg-soft-danger',
      iconColor: 'text-danger',
      sparkColor: '#EF5350',
      sparkData: [8, 10, 9, 12, 11, 13, 14],
    },
    {
      label: 'Near Expiry',
      value: '27 Batches',
      trend: '5 this week',
      trendUp: false,
      sub: 'Within 30 days',
      icon: 'schedule',
      iconBg: 'bg-soft-orange',
      iconColor: 'text-orange',
      sparkColor: '#FF9800',
      sparkData: [15, 18, 17, 22, 20, 25, 27],
    },
  ];

  // ─── Sparkline charts per KPI ────────────────────────────────
  sparklineCharts: (Partial<sparklineChartOptions> | null)[] = [];

  // ─── Sales & Category Charts ─────────────────────────────────
  public salesChartOptions!: Partial<areaChartOptions>;
  public categoriesChartOptions!: Partial<donutChartOptions>;

  // ─── Cold Storage Monitor ────────────────────────────────────
  coldStorageUnits = [
    {
      name: 'Insulin Cabinet',
      temp: 3.4,
      humidity: 42,
      tempMin: 2,
      tempMax: 8,
      humMin: 35,
      humMax: 55,
    },
    {
      name: 'Vaccine Fridge',
      temp: 4.2,
      humidity: 48,
      tempMin: 2,
      tempMax: 8,
      humMin: 40,
      humMax: 60,
    },
  ];
  public tempGaugeOptions!: Partial<radialChartOptions>;
  public humGaugeOptions!: Partial<radialChartOptions>;
  public tempGauge2Options!: Partial<radialChartOptions>;
  public humGauge2Options!: Partial<radialChartOptions>;

  get coldUnit1() {
    return this.coldStorageUnits[0];
  }
  get coldUnit2() {
    return this.coldStorageUnits[1];
  }

  isTempSafe(unit: (typeof this.coldStorageUnits)[0]): boolean {
    return unit.temp >= unit.tempMin && unit.temp <= unit.tempMax;
  }
  isHumSafe(unit: (typeof this.coldStorageUnits)[0]): boolean {
    return unit.humidity >= unit.humMin && unit.humidity <= unit.humMax;
  }

  // ─── Quick Reorder Low Stock ──────────────────────────────────
  lowStockItems: LowStockItem[] = [
    {
      name: 'Insulin Glargine 100IU',
      category: 'Endocrinology',
      currentStock: 15,
      minStock: 100,
      unit: 'vials',
      status: 'critical',
      reorderStatus: 'Reorder Now',
    },
    {
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      currentStock: 48,
      minStock: 200,
      unit: 'capsules',
      status: 'critical',
      reorderStatus: 'Reorder Now',
    },
    {
      name: 'Adrenaline 1mg/mL',
      category: 'Emergency',
      currentStock: 8,
      minStock: 50,
      unit: 'ampoules',
      status: 'critical',
      reorderStatus: 'Reorder Now',
    },
    {
      name: 'Metformin 850mg',
      category: 'Diabetology',
      currentStock: 120,
      minStock: 300,
      unit: 'tablets',
      status: 'warning',
      reorderStatus: 'Reorder Now',
    },
    {
      name: 'Atorvastatin 20mg',
      category: 'Cardiology',
      currentStock: 95,
      minStock: 200,
      unit: 'tablets',
      status: 'warning',
      reorderStatus: 'Reorder Now',
    },
    {
      name: 'Salbutamol Inhaler',
      category: 'Respiratory',
      currentStock: 22,
      minStock: 50,
      unit: 'units',
      status: 'warning',
      reorderStatus: 'Reorder Now',
    },
  ];

  quickReorder(item: LowStockItem) {
    item.reorderStatus = 'Ordering...';
    item.status = 'ordering';
    this.cdr.markForCheck();
    setTimeout(() => {
      item.reorderStatus = 'Order Placed ✓';
      this.cdr.markForCheck();
    }, 1800);
  }

  getStockPercent(item: LowStockItem): number {
    return Math.round((item.currentStock / item.minStock) * 100);
  }

  // ─── Staff Roster ────────────────────────────────────────────
  staffRoster: StaffMember[] = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Head Pharmacist',
      initials: 'SJ',
      avatarColor: '#2196F3',
      shift: 'Morning (7AM–3PM)',
      status: 'online',
      phone: '+1 (555) 0101',
    },
    {
      name: 'Mark Thompson',
      role: 'Pharmacist',
      initials: 'MT',
      avatarColor: '#66BB6A',
      shift: 'Morning (7AM–3PM)',
      status: 'online',
      phone: '+1 (555) 0102',
    },
    {
      name: 'Priya Nair',
      role: 'Pharmacy Technician',
      initials: 'PN',
      avatarColor: '#9C27B0',
      shift: 'Morning (7AM–3PM)',
      status: 'break',
      phone: '+1 (555) 0103',
    },
    {
      name: 'Carlos Reyes',
      role: 'Pharmacist',
      initials: 'CR',
      avatarColor: '#FF9800',
      shift: 'Evening (3PM–11PM)',
      status: 'offline',
      phone: '+1 (555) 0104',
    },
    {
      name: 'Amelia Chen',
      role: 'Pharmacy Technician',
      initials: 'AC',
      avatarColor: '#EF5350',
      shift: 'Evening (3PM–11PM)',
      status: 'offline',
      phone: '+1 (555) 0105',
    },
    {
      name: 'David Miller',
      role: 'Inventory Manager',
      initials: 'DM',
      avatarColor: '#26A69A',
      shift: 'Morning (7AM–3PM)',
      status: 'online',
      phone: '+1 (555) 0106',
    },
    {
      name: 'Sophia Martinez',
      role: 'Pharmacy Technician',
      initials: 'SM',
      avatarColor: '#AB47BC',
      shift: 'Evening (3PM–11PM)',
      status: 'online',
      phone: '+1 (555) 0107',
    },
    {
      name: 'James Wilson',
      role: 'Pharmacist',
      initials: 'JW',
      avatarColor: '#42A5F5',
      shift: 'Night (11PM–7AM)',
      status: 'online',
      phone: '+1 (555) 0108',
    },
    {
      name: 'Olivia Brown',
      role: 'Customer Service Associate',
      initials: 'OB',
      avatarColor: '#FFA726',
      shift: 'Morning (7AM–3PM)',
      status: 'break',
      phone: '+1 (555) 0109',
    },
    {
      name: 'Ethan Davis',
      role: 'Pharmacy Assistant',
      initials: 'ED',
      avatarColor: '#78909C',
      shift: 'Night (11PM–7AM)',
      status: 'offline',
      phone: '+1 (555) 0110',
    },
  ];

  get staffOnDutyCount(): number {
    return this.staffRoster.filter((s) => s.status === 'online').length;
  }

  getStatusLabel(status: StaffMember['status']): string {
    return { online: 'On Duty', break: 'On Break', offline: 'Off Shift' }[
      status
    ];
  }

  // ─── Supplier Orders ─────────────────────────────────────────
  supplierOrders: SupplierOrder[] = [
    {
      id: 'PO-2841',
      supplier: 'MediSupply Co.',
      items: 'Insulin Glargine x500, Amoxicillin x2000',
      amount: '$4,200',
      orderDate: 'Jun 9, 2026',
      expectedDelivery: 'Jun 11, 2026',
      status: 'In Transit',
      statusClass: 'badge-info',
      icon: 'local_shipping',
    },
    {
      id: 'PO-2839',
      supplier: 'PharmaBridge Ltd.',
      items: 'Atorvastatin x1500, Metformin x3000',
      amount: '$2,850',
      orderDate: 'Jun 8, 2026',
      expectedDelivery: 'Jun 12, 2026',
      status: 'Processing',
      statusClass: 'badge-warning',
      icon: 'hourglass_empty',
    },
    {
      id: 'PO-2836',
      supplier: 'Global Pharma Inc.',
      items: 'Vaccine Stock Batch #VB-449',
      amount: '$7,600',
      orderDate: 'Jun 6, 2026',
      expectedDelivery: 'Jun 13, 2026',
      status: 'Confirmed',
      statusClass: 'badge-success',
      icon: 'check_circle',
    },
    {
      id: 'PO-2830',
      supplier: 'MediSupply Co.',
      items: 'Surgical Supplies Bundle',
      amount: '$1,120',
      orderDate: 'Jun 4, 2026',
      expectedDelivery: 'Jun 10, 2026',
      status: 'Delivered',
      statusClass: 'badge-delivered',
      icon: 'inventory',
    },
    {
      id: 'PO-2845',
      supplier: 'HealthSource Distributors',
      items: 'Paracetamol x5000, Ibuprofen x2500',
      amount: '$3,450',
      orderDate: 'Jun 10, 2026',
      expectedDelivery: 'Jun 14, 2026',
      status: 'Confirmed',
      statusClass: 'badge-success',
      icon: 'check_circle',
    },
    {
      id: 'PO-2847',
      supplier: 'CarePlus Pharmaceuticals',
      items: 'Cefixime x1200, Vitamin D3 x4000',
      amount: '$2,180',
      orderDate: 'Jun 11, 2026',
      expectedDelivery: 'Jun 15, 2026',
      status: 'Processing',
      statusClass: 'badge-warning',
      icon: 'hourglass_empty',
    },
  ];

  // ─── Top Medicines ────────────────────────────────────────────
  topMedicines = [
    {
      name: 'Paracetamol 500mg',
      category: 'Analgesic',
      sales: 480,
      stock: '1,200 units',
      change: '+12%',
      trendUp: true,
    },
    {
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      sales: 320,
      stock: '850 units',
      change: '+8%',
      trendUp: true,
    },
    {
      name: 'Atorvastatin 20mg',
      category: 'Cardiology',
      sales: 290,
      stock: '430 units',
      change: '+15%',
      trendUp: true,
    },
    {
      name: 'Metformin 850mg',
      category: 'Diabetology',
      sales: 210,
      stock: '1,600 units',
      change: '+4%',
      trendUp: true,
    },
    {
      name: 'Insulin Glargine',
      category: 'Endocrinology',
      sales: 180,
      stock: '95 units',
      change: '-2%',
      trendUp: false,
    },
    {
      name: 'Salbutamol Inhaler',
      category: 'Respiratory',
      sales: 145,
      stock: '220 units',
      change: '+6%',
      trendUp: true,
    },
  ];

  // ─── Recent Transactions ─────────────────────────────────────
  recentTransactions = [
    {
      id: 'TX-8802',
      patient: 'Grace Miller',
      date: 'Just now',
      amount: '$45.20',
      items: 'Paracetamol x2, Amoxicillin x1',
      method: 'Card',
      status: 'Completed',
      statusClass: 'badge-success',
    },
    {
      id: 'TX-8798',
      patient: 'Liam Hall',
      date: '12 mins ago',
      amount: '$120.00',
      items: 'Insulin Glargine x1',
      method: 'Insurance',
      status: 'Completed',
      statusClass: 'badge-success',
    },
    {
      id: 'TX-8795',
      patient: 'Sofia Vance',
      date: '34 mins ago',
      amount: '$18.50',
      items: 'Ibuprofen x3',
      method: 'Cash',
      status: 'Completed',
      statusClass: 'badge-success',
    },
    {
      id: 'TX-8790',
      patient: 'Lucas Brown',
      date: '1 hr ago',
      amount: '$64.00',
      items: 'Atorvastatin x2, Metformin x1',
      method: 'Card',
      status: 'Completed',
      statusClass: 'badge-success',
    },
    {
      id: 'TX-8789',
      patient: 'Olivia Smith',
      date: '2 hrs ago',
      amount: '$25.00',
      items: 'Lisinopril x1',
      method: 'Cash',
      status: 'Completed',
      statusClass: 'badge-success',
    },
    {
      id: 'TX-8785',
      patient: 'Noah Adams',
      date: '3 hrs ago',
      amount: '$88.00',
      items: 'Vaccine Admin Fee',
      method: 'Insurance',
      status: 'Pending',
      statusClass: 'badge-warning',
    },
  ];

  ngOnInit() {
    this.initSparklines();
    this.initSalesChart();
    this.initCategoriesChart();
    this.initColdStorageGauges();
    this.startSensorSimulation();
  }

  ngOnDestroy() {
    if (this.sensorInterval) {
      clearInterval(this.sensorInterval);
    }
  }

  private initSparklines() {
    this.sparklineCharts = this.kpiCards.map((kpi) => ({
      series: [{ name: kpi.label, data: kpi.sparkData }],
      chart: {
        type: 'area',
        height: 50,
        sparkline: { enabled: true },
        animations: { enabled: true, speed: 400 },
      },
      stroke: { curve: 'smooth', width: 3 },
      colors: [kpi.sparkColor],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        marker: { show: false },
      },
    }));
  }

  private initSalesChart() {
    this.salesChartOptions = {
      series: [
        { name: 'OTC Sales', data: [1200, 1450, 1300, 1850, 1600, 2100, 2340] },
        {
          name: 'Prescription Sales',
          data: [2300, 2800, 2450, 3100, 2900, 3400, 3840],
        },
      ],
      chart: {
        height: 320,
        type: 'area',
        toolbar: { show: false },
        foreColor: '#9aa0ac',
        animations: { enabled: true, speed: 600 },
      },
      colors: ['#2196F3', '#66BB6A'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2.5 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      grid: {
        show: true,
        borderColor: 'rgba(154, 160, 172, 0.15)',
        strokeDashArray: 3,
      },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yaxis: { labels: { formatter: (v) => '$' + v.toLocaleString() } },
      legend: { show: true, position: 'top', horizontalAlign: 'center' },
      tooltip: {
        theme: 'dark',
        y: { formatter: (v) => '$' + v.toLocaleString() },
      },
    };
  }

  private initCategoriesChart() {
    this.categoriesChartOptions = {
      series: [38, 28, 20, 14],
      chart: { type: 'donut', height: 280 },
      labels: ['Antibiotics', 'Cardiology', 'Analgesics', 'Diabetology'],
      colors: ['#42A5F5', '#66BB6A', '#EF5350', '#FFCA28'],
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Sales',
                formatter: () => '3,450',
              },
            },
          },
        },
      },
      legend: { position: 'bottom', horizontalAlign: 'center' },
      dataLabels: { enabled: false },
    };
  }

  private initColdStorageGauges() {
    this.tempGaugeOptions = this.buildRadialGauge(
      this.coldUnit1.temp,
      -5,
      15,
      '#2196F3',
      '°C',
    );
    this.humGaugeOptions = this.buildRadialGauge(
      this.coldUnit1.humidity,
      0,
      100,
      '#66BB6A',
      '%',
    );
    this.tempGauge2Options = this.buildRadialGauge(
      this.coldUnit2.temp,
      -5,
      15,
      '#2196F3',
      '°C',
    );
    this.humGauge2Options = this.buildRadialGauge(
      this.coldUnit2.humidity,
      0,
      100,
      '#66BB6A',
      '%',
    );
  }

  private buildRadialGauge(
    value: number,
    min: number,
    max: number,
    color: string,
    suffix: string,
  ): Partial<radialChartOptions> {
    const pct = Math.round(((value - min) / (max - min)) * 100);
    return {
      series: [pct],
      chart: { type: 'radialBar', height: 130, sparkline: { enabled: true } },
      plotOptions: {
        radialBar: {
          hollow: { size: '60%' },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: '14px',
              fontWeight: 700,
              formatter: () => value.toFixed(1) + suffix,
            },
          },
          track: { background: 'rgba(154, 160, 172, 0.15)' },
        },
      },
      labels: [''],
      colors: [color],
    };
  }

  private startSensorSimulation() {
    this.sensorInterval = setInterval(() => {
      this.coldStorageUnits.forEach((unit) => {
        unit.temp = parseFloat(
          (unit.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        );
        unit.humidity = parseFloat(
          (unit.humidity + (Math.random() - 0.5) * 1.5).toFixed(1),
        );
      });
      this.initColdStorageGauges();
      this.cdr.markForCheck();
    }, 4000);
  }
}
