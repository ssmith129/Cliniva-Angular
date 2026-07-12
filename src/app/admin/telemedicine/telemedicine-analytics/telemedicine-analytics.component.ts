import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface KpiCard {
  label: string;
  value: string;
  sub: string;
  icon: string;
  trend: number; // percent change
  color: string;
}

interface TopDoctor {
  rank: number;
  name: string;
  avatar: string;
  specialty: string;
  consultations: number;
  rating: number;
  revenue: string;
}

interface MonthlyData {
  month: string;
  consultations: number;
  completed: number;
  cancelled: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-telemedicine-analytics',
  templateUrl: './telemedicine-analytics.component.html',
  styleUrls: ['./telemedicine-analytics.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
})
export class TelemedicineAnalyticsComponent {
  selectedPeriod = signal<'week' | 'month' | 'year'>('month');

  kpiCards = signal<KpiCard[]>([
    {
      label: 'Total Consultations',
      value: '1,284',
      sub: 'This month',
      icon: 'video_camera_front',
      trend: 18.4,
      color: '#4f8ef7',
    },
    {
      label: 'Completion Rate',
      value: '91.6%',
      sub: '+3.2% from last month',
      icon: 'check_circle_outline',
      trend: 3.2,
      color: '#22c55e',
    },
    {
      label: 'Avg. Call Duration',
      value: '22 min',
      sub: 'Per session',
      icon: 'timer',
      trend: -1.5,
      color: '#8b5cf6',
    },
    {
      label: 'Patient Satisfaction',
      value: '4.7 / 5',
      sub: 'Based on 936 reviews',
      icon: 'star',
      trend: 5.1,
      color: '#f97316',
    },
    {
      label: 'Revenue Generated',
      value: '$48,200',
      sub: 'Telemedicine revenue',
      icon: 'payments',
      trend: 22.3,
      color: '#06b6d4',
    },
  ]);

  topDoctors = signal<TopDoctor[]>([
    { rank: 1, name: 'Dr. Sarah Lee', avatar: 'SL', specialty: 'General Medicine', consultations: 234, rating: 4.9, revenue: '$12,400' },
    { rank: 2, name: 'Dr. James Wilson', avatar: 'JW', specialty: 'Cardiology', consultations: 198, rating: 4.8, revenue: '$11,200' },
    { rank: 3, name: 'Dr. Alan Park', avatar: 'AP', specialty: 'Dermatology', consultations: 176, rating: 4.7, revenue: '$9,800' },
    { rank: 4, name: 'Dr. Meera Patel', avatar: 'MP', specialty: 'Psychiatry', consultations: 152, rating: 4.8, revenue: '$8,900' },
    { rank: 5, name: 'Dr. Ria Sharma', avatar: 'RS', specialty: 'Pediatrics', consultations: 138, rating: 4.6, revenue: '$7,600' },
  ]);

  monthlyData = signal<MonthlyData[]>([
    { month: 'Jan', consultations: 820, completed: 748, cancelled: 72 },
    { month: 'Feb', consultations: 890, completed: 812, cancelled: 78 },
    { month: 'Mar', consultations: 960, completed: 880, cancelled: 80 },
    { month: 'Apr', consultations: 1040, completed: 950, cancelled: 90 },
    { month: 'May', consultations: 1120, completed: 1025, cancelled: 95 },
    { month: 'Jun', consultations: 1284, completed: 1176, cancelled: 108 },
  ]);

  consultationsByType = signal([
    { type: 'Video Call', count: 728, pct: 56, color: '#4f8ef7' },
    { type: 'Audio Call', count: 386, pct: 30, color: '#22c55e' },
    { type: 'Chat', count: 170, pct: 14, color: '#8b5cf6' },
  ]);

  maxConsultations = Math.max(...this.monthlyData().map((d) => d.consultations));

  getBarHeight(value: number): number {
    return Math.round((value / this.maxConsultations) * 100);
  }

  setPeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod.set(period);
  }

  getTrendClass(trend: number): string {
    return trend >= 0 ? 'trend-up' : 'trend-down';
  }

  getTrendIcon(trend: number): string {
    return trend >= 0 ? 'trending_up' : 'trending_down';
  }
}
