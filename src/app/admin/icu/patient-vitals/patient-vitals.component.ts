import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexDataLabels,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  selector: 'app-patient-vitals',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BreadcrumbComponent,
    MasterTableComponent,
    NgApexchartsModule
  ],
  templateUrl: './patient-vitals.component.html',
  styleUrls: ['./patient-vitals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientVitalsComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;
  public dataSource = new MatTableDataSource<unknown>();
  public isLoading = true;

  public columns: ColumnDefinition[] = [
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true },
    { def: 'bed', label: 'Bed No.', type: 'text', visible: true },
    { def: 'hr', label: 'HR (bpm)', type: 'text', visible: true },
    { def: 'bp', label: 'BP (mmHg)', type: 'text', visible: true },
    { def: 'spo2', label: 'SpO2 (%)', type: 'text', visible: true },
    { def: 'temp', label: 'Temp (°C)', type: 'text', visible: true },
    { def: 'rr', label: 'RR', type: 'text', visible: true },
    { def: 'time', label: 'Last Recorded', type: 'text', visible: true },
  ];

  ngOnInit() {
    this.chartOptions = {
      series: [
        { name: 'Heart Rate', data: [80, 82, 85, 90, 88, 85, 82] },
        { name: 'SpO2', data: [98, 97, 96, 95, 96, 98, 99] }
      ],
      chart: { height: 350, type: 'line', toolbar: { show: false } },
      colors: ['#ff4d4d', '#00bcd4'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: { categories: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'] },
    };

    // Simulate API call to show skeleton loading state automatically via master-table
    setTimeout(() => {
      this.dataSource.data = [
        { patientName: 'John Smith', bed: 'Bed 01', hr: '82', bp: '120/80', spo2: '98', temp: '36.8', rr: '16', time: '11:30 AM' },
        { patientName: 'Emily Carter', bed: 'Bed 02', hr: '95', bp: '130/85', spo2: '92', temp: '37.5', rr: '20', time: '11:28 AM' },
        { patientName: 'Michael Lee', bed: 'Bed 03', hr: '75', bp: '115/75', spo2: '99', temp: '36.5', rr: '14', time: '11:25 AM' },
      ];
      this.isLoading = false;
    }, 2000);
  }
}
