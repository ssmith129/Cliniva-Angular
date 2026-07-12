import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

export interface PTSession {
  id: string;
  patientName: string;
  patientId: string;
  therapist: string;
  therapyType: string;
  timeSlot: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  avatar: string;
}

@Component({
  selector: 'app-session-scheduling',
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
  templateUrl: './session-scheduling.component.html',
  styleUrls: ['./session-scheduling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionSchedulingComponent {
  displayedColumns: string[] = ['patient', 'therapist', 'therapy', 'timeSlot', 'status', 'actions'];

  sessions: PTSession[] = [
    { id: 'PT-901', patientName: 'John Smith', patientId: 'P-00214', therapist: 'Dr. Helen Keller (PT)', therapyType: 'Post-Stroke Rehab (Neuromuscular)', timeSlot: '09:00 AM - 10:00 AM', status: 'Scheduled', avatar: 'assets/images/user/user1.jpg' },
    { id: 'PT-902', patientName: 'Emily Carter', patientId: 'P-00352', therapist: 'Dr. David Villa (PT)', therapyType: 'Rotator Cuff ROM Exercises', timeSlot: '10:30 AM - 11:30 AM', status: 'Completed', avatar: 'assets/images/user/user2.jpg' },
    { id: 'PT-903', patientName: 'Michael Lee', patientId: 'P-00109', therapist: 'Dr. Helen Keller (PT)', therapyType: 'Lumbar Spinal Decompression', timeSlot: '01:00 PM - 02:00 PM', status: 'Scheduled', avatar: 'assets/images/user/user3.jpg' },
    { id: 'PT-904', patientName: 'Alice Johnson', patientId: 'P-00812', therapist: 'Dr. David Villa (PT)', therapyType: 'Post-ACL Tear Knee Mobilization', timeSlot: '03:00 PM - 04:00 PM', status: 'Cancelled', avatar: 'assets/images/user/user5.jpg' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge-success-soft text-success';
      case 'Cancelled': return 'badge-danger-soft text-danger';
      default: return 'badge-warning-soft text-warning';
    }
  }
}
