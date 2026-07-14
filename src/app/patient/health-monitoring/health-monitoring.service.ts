import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HealthMetric } from './health-monitoring.model';

@Injectable({
  providedIn: 'root'
})
export class HealthMonitoringService {
  private data: HealthMetric[] = [
    { id: 12, date: '2023-12-20', time: '08:30 AM', type: 'Heart Rate', value: '70', unit: 'bpm', status: 'Normal' },
    { id: 11, date: '2023-12-15', time: '07:50 AM', type: 'Sugar', value: '115', unit: 'mg/dL', status: 'Normal' },
    { id: 10, date: '2023-12-10', time: '09:15 AM', type: 'BP', value: '130/85', unit: 'mmHg', status: 'Normal' },
    { id: 9, date: '2023-12-05', time: '08:00 AM', type: 'Weight', value: '77.5', unit: 'kg', status: 'Normal' },
    { id: 8, date: '2023-12-01', time: '08:45 AM', type: 'Heart Rate', value: '68', unit: 'bpm', status: 'Normal' },
    { id: 7, date: '2023-11-25', time: '07:30 AM', type: 'Sugar', value: '105', unit: 'mg/dL', status: 'Normal' },
    { id: 6, date: '2023-11-20', time: '09:00 AM', type: 'BP', value: '118/76', unit: 'mmHg', status: 'Normal' },
    { id: 5, date: '2023-11-15', time: '08:15 AM', type: 'Weight', value: '78', unit: 'kg', status: 'Normal' },
    { id: 4, date: '2023-11-10', time: '07:45 AM', type: 'BP', value: '145/95', unit: 'mmHg', status: 'High', notes: 'Feeling a bit stressed.' },
    { id: 3, date: '2023-11-05', time: '10:00 AM', type: 'Sugar', value: '110', unit: 'mg/dL', status: 'Normal', notes: 'Post-breakfast.' },
    { id: 2, date: '2023-11-02', time: '09:30 AM', type: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal' },
    { id: 1, date: '2023-11-01', time: '08:00 AM', type: 'BP', value: '120/80', unit: 'mmHg', status: 'Normal', notes: 'Measured after waking up.' },
  ];

  private dataSubject = new BehaviorSubject<HealthMetric[]>(this.data);

  constructor() { }

  getAllHealthMetrics(): Observable<HealthMetric[]> {
    return this.dataSubject.asObservable();
  }

  addHealthMetric(metric: HealthMetric): void {
    metric.id = this.data.length + 1;
    this.data.unshift(metric);
    this.dataSubject.next(this.data);
  }

  updateHealthMetric(metric: HealthMetric): void {
    const index = this.data.findIndex(m => m.id === metric.id);
    if (index !== -1) {
      this.data[index] = metric;
      this.dataSubject.next(this.data);
    }
  }

  deleteHealthMetric(id: number): void {
    const index = this.data.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
