import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HealthPlan, Subscription } from './health-plans.model';

@Injectable({
  providedIn: 'root'
})
export class HealthPlansService {
  private data: HealthPlan[] = [
    { id: 1, planId: 'PLAN001', name: 'Premium Family Care', type: 'Family', price: '$99/mo', duration: '12 Months', features: ['Consultations', 'Lab Tests', 'Ambulance'], status: 'Active' },
    { id: 2, planId: 'PLAN002', name: 'Basic Individual', type: 'Individual', price: '$29/mo', duration: '6 Months', features: ['Consultations', 'Basic Tests'], status: 'Active' },
    { id: 3, planId: 'PLAN003', name: 'Senior Wellness', type: 'Senior', price: '$49/mo', duration: '12 Months', features: ['Home Visits', 'Specialist Care'], status: 'Inactive' },
    { id: 4, planId: 'PLAN004', name: 'Child Health Booster', type: 'Child', price: '$19/mo', duration: '12 Months', features: ['Vaccinations', 'Pediatrician'], status: 'Active' },
    { id: 5, planId: 'PLAN005', name: 'Executive Checkup', type: 'Individual', price: '$150/yr', duration: '1 Year', features: ['Full Body Scan', 'Consultations'], status: 'Active' },
    { id: 6, planId: 'PLAN006', name: 'Maternity Care', type: 'Maternity', price: '$120/mo', duration: '9 Months', features: ['Prenatal Care', 'Delivery Support'], status: 'Active' },
    { id: 7, planId: 'PLAN007', name: 'Dental Shield', type: 'Specialized', price: '$15/mo', duration: '12 Months', features: ['Cleaning', 'Fillings'], status: 'Active' },
    { id: 8, planId: 'PLAN008', name: 'Vision Plus', type: 'Specialized', price: '$10/mo', duration: '12 Months', features: ['Eye Exam', 'Glasses Discount'], status: 'Active' },
    { id: 9, planId: 'PLAN009', name: 'Diabetes Management', type: 'Chronic', price: '$40/mo', duration: '12 Months', features: ['Sugar Tests', 'Dietitian'], status: 'Active' },
    { id: 10, planId: 'PLAN010', name: 'Sports Injury Cover', type: 'Individual', price: '$35/mo', duration: '6 Months', features: ['Physiotherapy', 'Rehab'], status: 'Active' },
    { id: 11, planId: 'PLAN011', name: 'Mental Health Support', type: 'Individual', price: '$55/mo', duration: '12 Months', features: ['Counseling', 'Therapy'], status: 'Active' },
    { id: 12, planId: 'PLAN012', name: 'Home Care Essential', type: 'Senior', price: '$75/mo', duration: '12 Months', features: ['Nursing Support', 'Home Visits'], status: 'Inactive' },
  ];

  private dataSubject = new BehaviorSubject<HealthPlan[]>(this.data);
  private subscription: Subscription = {
    id: 1,
    planName: 'Premium Family Care',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    autoRenewal: true,
  };

  constructor() { }

  getAllHealthPlans(): Observable<HealthPlan[]> {
    return this.dataSubject.asObservable();
  }

  getActiveSubscription(): Observable<Subscription> {
    return new BehaviorSubject<Subscription>(this.subscription).asObservable();
  }

  addHealthPlan(plan: HealthPlan): void {
    plan.id = this.data.length + 1;
    this.data.push(plan);
    this.dataSubject.next(this.data);
  }

  updateHealthPlan(plan: HealthPlan): void {
    const index = this.data.findIndex(p => p.id === plan.id);
    if (index !== -1) {
      this.data[index] = plan;
      this.dataSubject.next(this.data);
    }
  }

  deleteHealthPlan(id: number): void {
    const index = this.data.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
