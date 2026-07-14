import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexTooltip, ApexStroke, ApexTitleSubtitle, ApexYAxis, ApexFill,
  ApexLegend, ApexPlotOptions, NgApexchartsModule, ApexResponsive, ApexGrid
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries | number[];
  chart: ApexChart; xaxis: ApexXAxis; yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle; dataLabels: ApexDataLabels; stroke: ApexStroke;
  fill: ApexFill; tooltip: ApexTooltip; legend: ApexLegend; plotOptions: ApexPlotOptions;
  colors: string[]; labels: string[]; responsive: ApexResponsive[]; grid: ApexGrid;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, NgApexchartsModule],
})
export class ExecutiveSummaryComponent implements OnInit {

  public revenueVsTargetOptions!: Partial<ChartOptions>;
  public departmentPerformanceOptions!: Partial<ChartOptions>;
  public bedOccupancyOptions!: Partial<ChartOptions>;
  public patientSatisfactionOptions!: Partial<ChartOptions>;
  public qualityMetricsOptions!: Partial<ChartOptions>;

  // KPI Summary Data
  kpiCards = [
    { icon: 'payments', label: 'Monthly Revenue', value: '$1.24M', change: '+12%', trend: 'up', bg: 'bg-teal' },
    { icon: 'bed', label: 'Bed Occupancy', value: '87%', change: '+3%', trend: 'up', bg: 'bg-blue' },
    { icon: 'groups', label: 'Total Patients (MTD)', value: '2,418', change: '+8%', trend: 'up', bg: 'bg-orange' },
    { icon: 'star_rate', label: 'Patient Satisfaction', value: '4.6/5', change: '+0.2', trend: 'up', bg: 'bg-purple' },
    { icon: 'medical_services', label: 'Active Doctors', value: '48', change: '+2', trend: 'up', bg: 'bg-teal' },
    { icon: 'local_hospital', label: 'Surgeries (MTD)', value: '185', change: '-5%', trend: 'down', bg: 'bg-red' },
    { icon: 'biotech', label: 'Lab Tests (MTD)', value: '1,135', change: '+10%', trend: 'up', bg: 'bg-blue' },
    { icon: 'policy', label: 'Insurance Claims', value: '312', change: '+15%', trend: 'up', bg: 'bg-orange' },
  ];

  topDiagnoses = [
    { rank: 1, name: 'Hypertension', count: 285, percentage: 18.5 },
    { rank: 2, name: 'Type 2 Diabetes', count: 218, percentage: 14.1 },
    { rank: 3, name: 'Cardiac Disease', count: 192, percentage: 12.4 },
    { rank: 4, name: 'Respiratory Infections', count: 175, percentage: 11.3 },
    { rank: 5, name: 'Orthopaedic Issues', count: 162, percentage: 10.5 },
  ];

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    // Revenue vs Target
    this.revenueVsTargetOptions = {
      series: [
        { name: 'Actual Revenue ($K)', data: [980, 1050, 1020, 1100, 1150, 1080, 1200, 1180, 1220, 1190, 1240, 1280] },
        { name: 'Target ($K)', data: [1000, 1000, 1050, 1050, 1100, 1100, 1150, 1150, 1200, 1200, 1200, 1250] },
      ],
      chart: { height: 280, type: 'line', toolbar: { show: false } },
      colors: ['#6777ef', '#ff9800'],
      stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
      dataLabels: { enabled: false },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
      yaxis: { title: { text: 'Revenue ($K)' } },
      legend: { position: 'top' },
      title: { text: 'Revenue vs Target (2024)', align: 'left' },
    };

    // Department Performance (Radar)
    this.departmentPerformanceOptions = {
      series: [{ name: 'Performance Score', data: [88, 92, 85, 79, 94, 87, 82, 96, 75, 90] }],
      chart: { height: 280, type: 'radar', toolbar: { show: false } },
      xaxis: {
        categories: ['Cardiology','Neurology','Orthopedics','Pediatrics','General Medicine','Pharmacy','Laboratory','Surgery','Emergency','Radiology'],
      },
      colors: ['#6777ef'],
      fill: { opacity: 0.4 },
      title: { text: 'Department Performance Scores', align: 'left' },
    };

    // Bed Occupancy by Ward
    this.bedOccupancyOptions = {
      series: [{ name: 'Occupancy %', data: [92, 85, 78, 95, 88, 72, 81, 90, 65, 87] }],
      chart: { type: 'bar', height: 280, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } },
      dataLabels: { enabled: true, formatter: (val: number) => val + '%', offsetX: 30 },
      xaxis: {
        categories: ['Cardiology ICU','General Ward A','General Ward B','Neurology','Orthopedics','Pediatrics','Surgery','Maternity','Oncology','General Medicine'],
        max: 100,
        title: { text: 'Occupancy %' },
      },
      colors: ['#4caf50'],
      title: { text: 'Bed Occupancy by Ward (%)', align: 'left' },
    };

    // Patient Satisfaction
    this.patientSatisfactionOptions = {
      series: [92],
      chart: { type: 'radialBar', height: 280 },
      plotOptions: {
        radialBar: {
          startAngle: -135, endAngle: 135,
          hollow: { margin: 0, size: '70%' },
          dataLabels: {
            name: { fontSize: '16px', color: undefined, offsetY: 120 },
            value: { offsetY: 76, fontSize: '22px' },
          },
        },
      },
      fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', gradientToColors: ['#87D4F9'], stops: [0, 100] } },
      stroke: { dashArray: 4 },
      labels: ['Patient Satisfaction'],
      colors: ['#6777ef'],
    };

    // Quality Metrics Donut
    this.qualityMetricsOptions = {
      series: [94, 87, 91, 78, 95],
      chart: { type: 'donut', height: 280 },
      labels: ['HCAHPS Score', 'Readmission Rate', 'Infection Control', 'Mortality Index', 'Hand Hygiene'],
      colors: ['#4caf50', '#ff9800', '#6777ef', '#f44336', '#00bcd4'],
      legend: { position: 'bottom' },
      title: { text: 'Quality & Safety Metrics (%)', align: 'left' },
    };
  }
}
