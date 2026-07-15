import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

interface WaitingPatient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  doctor: string;
  specialty: string;
  scheduledTime: string;
  waitingMinutes: number;
  status: 'waiting' | 'in-call' | 'ready' | 'no-show';
  priority: 'normal' | 'urgent';
  condition: string;
  joinedAt: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, MatTooltipModule, MatChipsModule],
})
export class WaitingRoomComponent {
  selectedFilter = signal<string>('all');

  patients = signal<WaitingPatient[]>([
    {
      id: 'P-1041',
      name: 'Emily Carter',
      avatar: 'EC',
      age: 34,
      gender: 'Female',
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiology',
      scheduledTime: '09:00 AM',
      waitingMinutes: 12,
      status: 'waiting',
      priority: 'urgent',
      condition: 'Chest pain follow-up',
      joinedAt: '08:58 AM',
    },
    {
      id: 'P-1042',
      name: 'Marcus Johnson',
      avatar: 'MJ',
      age: 52,
      gender: 'Male',
      doctor: 'Dr. Sarah Lee',
      specialty: 'General Medicine',
      scheduledTime: '09:15 AM',
      waitingMinutes: 8,
      status: 'ready',
      priority: 'normal',
      condition: 'Routine check-up',
      joinedAt: '09:10 AM',
    },
    {
      id: 'P-1043',
      name: 'Sofia Ramirez',
      avatar: 'SR',
      age: 28,
      gender: 'Female',
      doctor: 'Dr. Alan Park',
      specialty: 'Dermatology',
      scheduledTime: '09:30 AM',
      waitingMinutes: 2,
      status: 'in-call',
      priority: 'normal',
      condition: 'Eczema review',
      joinedAt: '09:28 AM',
    },
    {
      id: 'P-1044',
      name: 'Robert Hayes',
      avatar: 'RH',
      age: 61,
      gender: 'Male',
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiology',
      scheduledTime: '09:45 AM',
      waitingMinutes: 0,
      status: 'waiting',
      priority: 'urgent',
      condition: 'Post-surgery evaluation',
      joinedAt: '09:40 AM',
    },
    {
      id: 'P-1045',
      name: 'Priya Nair',
      avatar: 'PN',
      age: 42,
      gender: 'Female',
      doctor: 'Dr. Sarah Lee',
      specialty: 'General Medicine',
      scheduledTime: '10:00 AM',
      waitingMinutes: 0,
      status: 'waiting',
      priority: 'normal',
      condition: 'Diabetes management',
      joinedAt: '09:55 AM',
    },
    {
      id: 'P-1046',
      name: 'David Chen',
      avatar: 'DC',
      age: 38,
      gender: 'Male',
      doctor: 'Dr. Meera Patel',
      specialty: 'Psychiatry',
      scheduledTime: '10:15 AM',
      waitingMinutes: 0,
      status: 'no-show',
      priority: 'normal',
      condition: 'Anxiety disorder session',
      joinedAt: '—',
    },
  ]);

  filteredPatients = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.patients();
    return this.patients().filter((p) => p.status === filter);
  });

  stats = computed(() => {
    const all = this.patients();
    return {
      total: all.length,
      waiting: all.filter((p) => p.status === 'waiting').length,
      inCall: all.filter((p) => p.status === 'in-call').length,
      ready: all.filter((p) => p.status === 'ready').length,
      noShow: all.filter((p) => p.status === 'no-show').length,
      avgWait: Math.round(
        all.filter((p) => p.waitingMinutes > 0).reduce((s, p) => s + p.waitingMinutes, 0) /
          Math.max(1, all.filter((p) => p.waitingMinutes > 0).length)
      ),
    };
  });

  setFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      waiting: 'Waiting',
      'in-call': 'In Call',
      ready: 'Ready',
      'no-show': 'No Show',
    };
    return map[status] ?? status;
  }

  admitPatient(patient: WaitingPatient) {
    this.patients.update((list) =>
      list.map((p) => (p.id === patient.id ? { ...p, status: 'in-call' } : p))
    );
  }

  markNoShow(patient: WaitingPatient) {
    this.patients.update((list) =>
      list.map((p) => (p.id === patient.id ? { ...p, status: 'no-show' } : p))
    );
  }
}
