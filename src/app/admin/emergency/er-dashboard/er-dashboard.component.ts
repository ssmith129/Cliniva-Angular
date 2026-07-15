import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexGrid,
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ChartCard6Component } from '@shared/components/chart-card6/chart-card6.component';
import { AvgWaitTimeComponent } from '@shared/components/avg-wait-time/avg-wait-time.component';
import { ClinicalEventListComponent } from '@shared/components/clinical-event-list/clinical-event-list.component';
import {
  CriticalAlertsComponent,
  CriticalAlert,
} from '@shared/components/critical-alerts/critical-alerts.component';
import { DoctorOnCallComponent } from '@shared/components/doctor-on-call/doctor-on-call.component';
import { BloodBankStockComponent } from '@shared/components/blood-bank-stock/blood-bank-stock.component';
import { StaffOnDutyComponent } from '@shared/components/staff-on-duty/staff-on-duty.component';
import { ResourceMonitorComponent } from '@shared/components/resource-monitor/resource-monitor.component';
import { WardBedStatusComponent } from '@shared/components/ward-bed-status/ward-bed-status.component';
import { PatientSatisfactionComponent } from '@shared/components/patient-satisfaction/patient-satisfaction.component';
import { InflowOutflowWidgetComponent } from '@shared/components/inflow-outflow-widget/inflow-outflow-widget.component';
import { LabReportStatusComponent } from '@shared/components/lab-report-status/lab-report-status.component';
import {
  HandoffNotesComponent,
  HandoffNote,
} from '@shared/components/handoff-notes/handoff-notes.component';
import { EmergencyContactsComponent } from '@shared/components/emergency-contacts/emergency-contacts.component';
import { BloodReserveGridComponent } from '@shared/components/blood-reserve-grid/blood-reserve-grid.component';
import { LabSampleTrackingComponent } from '@shared/components/lab-sample-tracking/lab-sample-tracking.component';
import {
  EmergencyListComponent,
  EmergencyCase,
} from '@shared/components/emergency-list/emergency-list.component';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
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
  labels: string[];
};

@Component({
  selector: 'app-er-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgApexchartsModule,
    BreadcrumbComponent,
    ChartCard6Component,
    AvgWaitTimeComponent,
    ClinicalEventListComponent,
    CriticalAlertsComponent,
    DoctorOnCallComponent,
    BloodBankStockComponent,
    StaffOnDutyComponent,
    ResourceMonitorComponent,
    WardBedStatusComponent,
    PatientSatisfactionComponent,
    InflowOutflowWidgetComponent,
    LabReportStatusComponent,
    HandoffNotesComponent,
    EmergencyContactsComponent,
    BloodReserveGridComponent,
    LabSampleTrackingComponent,
    EmergencyListComponent,
  ],
  templateUrl: './er-dashboard.component.html',
  styleUrl: './er-dashboard.component.scss',
})
export class ErDashboardComponent implements OnInit {
  public triageChartOptions!: Partial<ChartOptions>;
  public bedStatusChartOptions!: Partial<ChartOptions>;
  public smallChart1Options!: Partial<ChartOptions>;
  public smallChart2Options!: Partial<ChartOptions>;
  public smallChart3Options!: Partial<ChartOptions>;
  public smallChart4Options!: Partial<ChartOptions>;

  public erAlerts: CriticalAlert[] = [
    {
      id: '1',
      img: 'assets/images/user/user1.jpg',
      patientName: 'Unknown Trauma',
      roomNumber: 'Trauma Bay 1',
      alertType: 'Code Blue',
      message: 'Incoming ETA 5 mins',
      time: 'Just now',
      timestamp: new Date().toISOString(),
      severity: 'Critical',
      severityClass: 'col-red',
      isNew: true,
    },
    {
      id: '2',
      img: 'assets/images/user/user2.jpg',
      patientName: 'Jane Smith',
      roomNumber: 'Bed 4',
      alertType: 'Stat Lab',
      message: 'Troponin elevated',
      time: '10 min ago',
      timestamp: new Date().toISOString(),
      severity: 'High',
      severityClass: 'col-orange',
      isNew: true,
    },
  ];

  public erHandoffNotes: HandoffNote[] = [
    {
      img: 'assets/images/user/user4.jpg',
      sender: 'Dr. Sarah Jenkins',
      timestamp: '15 mins ago',
      message:
        'Trauma Bay 1 patient stabilized, ready for CT scan. Keep monitored.',
      priority: 'High',
      priorityClass: 'high-priority',
    },
    {
      img: 'assets/images/user/user3.jpg',
      sender: 'Dr. Ryan Cooper',
      timestamp: '30 mins ago',
      message:
        'Bed 3 patient waiting for urine toxicology results before discharge.',
      priority: 'Medium',
      priorityClass: 'medium-priority',
    },
    {
      img: 'assets/images/user/user5.jpg',
      sender: 'Nurse Emma Watson',
      timestamp: '1 hour ago',
      message:
        'Shift handover complete for West Wing. Bed 7 needs IV drip replaced at 16:30.',
      priority: 'Low',
      priorityClass: 'low-priority',
    },
  ];

  public erEmergencyCases: EmergencyCase[] = [
    {
      patientName: 'David Miller',
      caseType: 'critical',
      caseDescription: 'Cardiac Arrest',
      timeAgo: '2 mins ago',
    },
    {
      patientName: 'Sarah Connor',
      caseType: 'urgent',
      caseDescription: 'Severe Fracture',
      timeAgo: '12 mins ago',
    },
    {
      patientName: 'John Doe',
      caseType: 'non-urgent',
      caseDescription: 'Minor Laceration',
      timeAgo: '25 mins ago',
    },
    {
      patientName: 'Emily Johnson',
      caseType: 'critical',
      caseDescription: 'Stroke Symptoms',
      timeAgo: '5 mins ago',
    },
    {
      patientName: 'Michael Brown',
      caseType: 'urgent',
      caseDescription: 'High Fever & Dehydration',
      timeAgo: '18 mins ago',
    },
    {
      patientName: 'Olivia Davis',
      caseType: 'non-urgent',
      caseDescription: 'Sprained Ankle',
      timeAgo: '32 mins ago',
    },
    {
      patientName: 'James Wilson',
      caseType: 'urgent',
      caseDescription: 'Chest Pain Evaluation',
      timeAgo: '40 mins ago',
    },
  ];

  constructor() {
    this.initTriageChart();
    this.initBedStatusChart();
    this.initSmallCharts();
  }

  ngOnInit(): void {}

  private initSmallCharts() {
    const commonChartConfig = {
      chart: {
        height: 70,
        type: 'area' as const,
        toolbar: { show: false },
        sparkline: { enabled: true },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as const },
      xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
      legend: { show: false },
      tooltip: { theme: 'dark', marker: { show: true }, x: { show: false } },
    };

    this.smallChart1Options = {
      ...commonChartConfig,
      series: [
        { name: 'ER Cases', data: [12, 14, 18, 15, 22, 30, 28, 35, 40, 42] },
      ],
      colors: ['#FD7E14'],
    };
    this.smallChart2Options = {
      ...commonChartConfig,
      series: [
        { name: 'Wait Time', data: [15, 18, 22, 28, 35, 30, 25, 20, 22, 24] },
      ],
      colors: ['#6F42C1'],
    };
    this.smallChart3Options = {
      ...commonChartConfig,
      series: [
        { name: 'Discharged', data: [2, 3, 5, 4, 8, 10, 12, 15, 16, 18] },
      ],
      colors: ['#4CAF50'],
    };
    this.smallChart4Options = {
      ...commonChartConfig,
      series: [{ name: 'Transferred', data: [0, 1, 0, 2, 1, 3, 2, 4, 4, 5] }],
      colors: ['#2196F3'],
    };
  }

  private initTriageChart() {
    this.triageChartOptions = {
      series: [5, 12, 25, 30, 15],
      chart: { type: 'donut', height: 320 },
      labels: [
        'Level 1 (Resuscitation)',
        'Level 2 (Emergent)',
        'Level 3 (Urgent)',
        'Level 4 (Less Urgent)',
        'Level 5 (Non-Urgent)',
      ],
      colors: ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#0275d8'],
      dataLabels: { enabled: true },
      legend: { position: 'bottom' },
      plotOptions: { pie: { donut: { size: '65%' } } },
    };
  }

  private initBedStatusChart() {
    this.bedStatusChartOptions = {
      series: [8, 2, 2],
      chart: { type: 'pie', height: 320 },
      labels: ['Occupied', 'Available', 'Cleaning'],
      colors: ['#d9534f', '#5cb85c', '#f0ad4e'],
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'bottom',
      },
    };
  }
}
