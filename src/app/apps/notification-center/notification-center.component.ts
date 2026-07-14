import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Subscription, interval } from 'rxjs';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'clinical' | 'administrative' | 'system' | 'message';
  time: string;
  read: boolean;
  color: string; // CSS class for icon background
  icon: string; // FontAwesome icon class
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    BreadcrumbComponent,
  ],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Notification Center',
      items: ['Apps'],
      active: 'Notification Center',
    },
  ];

  searchText = '';
  selectedFilter: 'all' | 'unread' | 'clinical' | 'administrative' | 'system' = 'all';

  notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Term Surgery Schedule Published',
      message: 'The final timetable for the Q3 Term Surgeries is now available on the portal. Please review patient allocations.',
      type: 'clinical',
      time: '10 mins ago',
      read: false,
      color: 'bg-soft-danger text-danger',
      icon: 'local_hospital',
    },
    {
      id: '2',
      title: 'New Patient Registration',
      message: 'Patient James Andrews (Ward 10B) has completed registration. Verification needed.',
      type: 'administrative',
      time: '45 mins ago',
      read: false,
      color: 'bg-soft-success text-success',
      icon: 'person_add',
    },
    {
      id: '3',
      title: 'System Server Maintenance',
      message: 'The patient information system will undergo scheduled database maintenance tonight from 12:00 AM to 2:00 AM EST.',
      type: 'system',
      time: '2 hours ago',
      read: true,
      color: 'bg-soft-warning text-warning',
      icon: 'dns',
    },
    {
      id: '4',
      title: 'Staff Meeting Minutes Uploaded',
      message: 'The minutes from yesterday\'s board assembly have been uploaded to the archives folder.',
      type: 'clinical',
      time: '4 hours ago',
      read: true,
      color: 'bg-soft-blue text-blue',
      icon: 'description',
    },
    {
      id: '5',
      title: 'Pending Lab Results',
      message: '15 patients have pending lab results from yesterday. Automated reminders have been dispatched to the concerned departments.',
      type: 'administrative',
      time: '1 day ago',
      read: true,
      color: 'bg-soft-purple text-purple',
      icon: 'science',
    },
  ];

  private simSub?: Subscription;

  ngOnInit(): void {
    // Simulator: Add a mock live notification every 45 seconds to demonstrate dynamic/reactive UI.
    this.simSub = interval(45000).subscribe(() => {
      this.generateLiveNotification();
        this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.simSub) {
      this.simSub.unsubscribe();
    }
  }

  // Get unread count
  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  // Filter list dynamically
  get filteredNotifications(): NotificationItem[] {
    return this.notifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        n.message.toLowerCase().includes(this.searchText.toLowerCase());

      if (this.selectedFilter === 'all') return matchesSearch;
      if (this.selectedFilter === 'unread') return !n.read && matchesSearch;
      if (this.selectedFilter === 'clinical') return n.type === 'clinical' && matchesSearch;
      if (this.selectedFilter === 'administrative') return n.type === 'administrative' && matchesSearch;
      if (this.selectedFilter === 'system') return n.type === 'system' && matchesSearch;

      return matchesSearch;
    });
  }

  // Mark single as read
  markAsRead(item: NotificationItem): void {
    item.read = true;
    this.cdr.markForCheck();
  }

  // Toggle read status
  toggleRead(item: NotificationItem): void {
    item.read = !item.read;
    this.cdr.markForCheck();
  }

  // Mark all as read
  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
    this.cdr.markForCheck();
  }

  // Clear single
  deleteNotification(item: NotificationItem): void {
    this.notifications = this.notifications.filter((n) => n.id !== item.id);
    this.cdr.markForCheck();
  }

  // Clear all
  clearAll(): void {
    this.notifications = [];
    this.cdr.markForCheck();
  }

  // Simulating live server pushed events
  private generateLiveNotification(): void {
    const alerts = [
      {
        title: 'New Lab Report Uploaded',
        message: 'Patient Sophia Vance\'s blood test report has been uploaded.',
        type: 'clinical',
        color: 'bg-soft-blue text-blue',
        icon: 'assignment',
      },
      {
        title: 'Security Alert: Failed Logins',
        message: 'System detected multiple failed login attempts on patient portal.',
        type: 'system',
        color: 'bg-soft-danger text-danger',
        icon: 'warning_amber',
      },
      {
        title: 'Leave Request Pending Approval',
        message: 'Doctor Sarah Smith has requested casual leave for June 12th.',
        type: 'administrative',
        color: 'bg-soft-warning text-warning',
        icon: 'pending_actions',
      },
    ];

    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];

    const newNotification: NotificationItem = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      title: randomAlert.title,
      message: randomAlert.message,
      type: randomAlert.type as NotificationItem['type'],
      time: 'Just now',
      read: false,
      color: randomAlert.color,
      icon: randomAlert.icon,
    };

    this.notifications.unshift(newNotification);
    this.cdr.markForCheck();
  }
}
