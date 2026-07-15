import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnalyticsRecord } from './analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private data: AnalyticsRecord[] = [
    {
      id: 1,
      metric: 'Total Patients',
      value: 1250,
      change: '+15%',
      period: 'This Month',
    },
    {
      id: 2,
      metric: 'New Consultations',
      value: 450,
      change: '+5%',
      period: 'This Month',
    },
    {
      id: 3,
      metric: 'Revenue',
      value: 125000,
      change: '+12%',
      period: 'This Month',
    },
    {
      id: 4,
      metric: 'Patient Satisfaction',
      value: 98,
      change: '+2%',
      period: 'This Month',
    },
    {
      id: 5,
      metric: 'Emergency Cases',
      value: 85,
      change: '+10%',
      period: 'This Month',
    },
    {
      id: 6,
      metric: 'Average Wait Time',
      value: 15,
      change: '-5%',
      period: 'This Month',
    },
    {
      id: 7,
      metric: 'Surgery Success Rate',
      value: 99.2,
      change: '+0.5%',
      period: 'This Month',
    },
    {
      id: 8,
      metric: 'Staff Performance',
      value: 92,
      change: '+3%',
      period: 'This Month',
    },
    {
      id: 9,
      metric: 'Bed Occupancy',
      value: 88,
      change: '+4%',
      period: 'This Month',
    },
    {
      id: 10,
      metric: 'Lab Test Accuracy',
      value: 99.8,
      change: '+0.1%',
      period: 'This Month',
    },
    {
      id: 11,
      metric: 'Outpatient Visits',
      value: 850,
      change: '+8%',
      period: 'This Month',
    },
    {
      id: 12,
      metric: 'Inpatient Admissions',
      value: 320,
      change: '+6%',
      period: 'This Month',
    },
  ];

  private dataSubject = new BehaviorSubject<AnalyticsRecord[]>(this.data);

  constructor() {}

  getAllAnalytics(): Observable<AnalyticsRecord[]> {
    return this.dataSubject.asObservable();
  }

  addAnalytics(analytics: AnalyticsRecord): void {
    analytics.id = this.data.length + 1;
    this.data.unshift(analytics);
    this.dataSubject.next(this.data);
  }

  updateAnalytics(analytics: AnalyticsRecord): void {
    const index = this.data.findIndex((d) => d.id === analytics.id);
    if (index !== -1) {
      this.data[index] = analytics;
      this.dataSubject.next(this.data);
    }
  }

  deleteAnalytics(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
