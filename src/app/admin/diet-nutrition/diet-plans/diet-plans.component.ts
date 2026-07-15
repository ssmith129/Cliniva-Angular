import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

export interface DietPlan {
  id: string;
  patientName: string;
  patientId: string;
  dietType: string;
  dailyCalories: number;
  status: 'Active' | 'Completed' | 'Pending Review';
  lastUpdated: string;
  avatar: string;
}

@Component({
  selector: 'app-diet-plans',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './diet-plans.component.html',
  styleUrls: ['./diet-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietPlansComponent {
  displayedColumns: string[] = ['patient', 'dietType', 'calories', 'status', 'lastUpdated', 'actions'];
  
  dietPlans: DietPlan[] = [
    { id: 'DP-101', patientName: 'John Smith', patientId: 'P-00214', dietType: 'Low Sodium Cardiac', dailyCalories: 1800, status: 'Active', lastUpdated: '2026-06-12', avatar: 'assets/images/user/user1.jpg' },
    { id: 'DP-102', patientName: 'Emily Carter', patientId: 'P-00352', dietType: 'Diabetic Standard', dailyCalories: 1600, status: 'Active', lastUpdated: '2026-06-14', avatar: 'assets/images/user/user2.jpg' },
    { id: 'DP-103', patientName: 'Michael Lee', patientId: 'P-00109', dietType: 'Renal Restricted', dailyCalories: 2000, status: 'Pending Review', lastUpdated: '2026-06-15', avatar: 'assets/images/user/user3.jpg' },
    { id: 'DP-104', patientName: 'Sarah Connor', patientId: 'P-00488', dietType: 'Ketogenic Weight Management', dailyCalories: 2200, status: 'Completed', lastUpdated: '2026-05-30', avatar: 'assets/images/user/user4.jpg' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'badge-success-soft text-success';
      case 'Completed': return 'badge-info-soft text-info';
      default: return 'badge-warning-soft text-warning';
    }
  }
}
