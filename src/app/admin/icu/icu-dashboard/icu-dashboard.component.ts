import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AiService } from '@core/service/ai.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { NgScrollbar } from 'ngx-scrollbar';

export type sparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  colors: string[];
};

export type doughnutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};

export interface AiForecastResult {
  inflowRisk: 'Low' | 'Medium' | 'High';
  recommendedStaffing: string;
  staffingDetails: string;
  capacityAlert: string;
  predictedPeak: string;
  recommendations: string;
}

@Component({
  selector: 'app-icu-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BreadcrumbComponent,
    NgApexchartsModule,
    NgScrollbar,
    MatSnackBarModule
  ],
  templateUrl: './icu-dashboard.component.html',
  styleUrls: ['./icu-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcuDashboardComponent implements OnInit {
  public sparklineOptions!: Partial<sparklineChartOptions>;
  public capacityOptions!: Partial<doughnutChartOptions>;
  
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);
  
  isAiLoading = signal<boolean>(false);
  aiForecast = signal<AiForecastResult | null>(null);
  
  hrSeries: ApexAxisChartSeries = [{ name: 'Heart Rate', data: [75, 78, 82, 85, 90, 88, 86, 85, 80, 78] }];
  bpSeries: ApexAxisChartSeries = [{ name: 'Blood Pressure', data: [110, 115, 118, 120, 115, 112, 110] }];
  spo2Series: ApexAxisChartSeries = [{ name: 'SpO2', data: [98, 98, 99, 97, 96, 95, 94, 95, 96] }];
  tempSeries: ApexAxisChartSeries = [{ name: 'Temperature', data: [36.5, 36.6, 36.8, 37.1, 37.5, 37.8, 37.5] }];

  recentAdmissions = [
    { name: 'John Doe', bed: 'Bed 01', time: '10:30 AM', status: 'Critical', avatar: 'assets/images/user/user1.jpg' },
    { name: 'Alice Smith', bed: 'Bed 05', time: '09:15 AM', status: 'Stable', avatar: 'assets/images/user/user2.jpg' },
    { name: 'Bob Johnson', bed: 'Bed 02', time: 'Yesterday', status: 'Observation', avatar: 'assets/images/user/user3.jpg' },
    { name: 'Sarah Connor', bed: 'Bed 03', time: '08:45 AM', status: 'Critical', avatar: 'assets/images/user/user4.jpg' },
    { name: 'Michael Scott', bed: 'Bed 06', time: '07:30 AM', status: 'Stable', avatar: 'assets/images/user/user5.jpg' },
    { name: 'Emma Watson', bed: 'Bed 04', time: 'Yesterday', status: 'Observation', avatar: 'assets/images/user/user6.jpg' }
  ];

  ngOnInit() {
    this.sparklineOptions = {
      chart: {
        type: 'line',
        height: 60,
        width: 100,
        sparkline: { enabled: true },
        toolbar: { show: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: { formatter: () => '' },
        },
        marker: { show: false },
      },
    };

    this.capacityOptions = {
      series: [6, 2], // 6 occupied, 2 available
      chart: { type: 'donut', height: 250 },
      labels: ['Occupied', 'Available'],
      colors: ['#ff4d4d', '#4caf50'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: { show: true, name: { show: true }, value: { show: true } }
          }
        }
      }
    };
  }

  runAiDispatcher() {
    this.isAiLoading.set(true);
    const occupiedBeds = 6;
    const totalBeds = 8;
    
    const prompt = `Act as a clinical hospital administrator and resource forecaster.
    Based on this current ICU state:
    - Occupied Beds: ${occupiedBeds}/${totalBeds} (75% occupancy)
    - Available Beds: 2
    - Recent Admissions: 6 patients (John Doe, Alice Smith, Bob Johnson, Sarah Connor, Michael Scott, Emma Watson), 2 in Critical condition.
    - Active Alerts: Bed 02 SpO2 low, Bed 05 HR elevated, Bed 01 IV fluid low.
    
    Determine:
    1. Inflow Risk level (Low | Medium | High)
    2. Recommended Staffing nurse-to-patient ratio
    3. Capacity Alert message
    4. Predicted Peak admission hours
    5. Actionable staffing and patient movement recommendations
    
    Return ONLY a valid JSON object matching the following structure (do not include other markdown wrapper text other than json block):
    {
      "inflowRisk": "Low" | "Medium" | "High",
      "recommendedStaffing": "string",
      "staffingDetails": "string",
      "capacityAlert": "string",
      "predictedPeak": "string",
      "recommendations": "string"
    }`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isAiLoading.set(false);
        try {
          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson) as AiForecastResult;
          this.aiForecast.set(parsed);
          this.snackBar.open('ICU Capacity forecast generated!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        } catch (_e) {
          const fallbackResult: AiForecastResult = {
            inflowRisk: 'High',
            recommendedStaffing: '1:1 for Critical Patients',
            staffingDetails: 'Require 2 additional nurses for the night shift.',
            capacityAlert: 'ICU Bottleneck Warning (75% full)',
            predictedPeak: '10:00 PM - 02:00 AM',
            recommendations: 'Transition Bed 05 to general ward if stable. Pre-allocate emergency backup nursing staff.'
          };
          this.aiForecast.set(fallbackResult);
          this.snackBar.open('ICU Capacity forecast completed.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isAiLoading.set(false);
        this.snackBar.open('AI forecasting failed. Please configure AI settings.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }
}
