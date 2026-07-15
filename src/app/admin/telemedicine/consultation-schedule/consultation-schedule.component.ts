import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consultation-schedule',
  templateUrl: './consultation-schedule.component.html',
  styleUrls: ['./consultation-schedule.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, MatTooltipModule],
})
export class ConsultationScheduleComponent {
  viewMode = signal<'list' | 'calendar'>('list');
  filterStatus = signal<string>('all');
  selectedDate = signal<string>(new Date().toISOString().split('T')[0]);

  appointments = signal<Appointment[]>([
    {
      id: 'TC-2001',
      patientName: 'Emily Carter',
      patientAvatar: 'EC',
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiology',
      date: '2026-06-11',
      time: '09:00',
      duration: 30,
      type: 'video',
      status: 'scheduled',
      notes: 'Follow-up after ECG review',
    },
    {
      id: 'TC-2002',
      patientName: 'Marcus Johnson',
      patientAvatar: 'MJ',
      doctor: 'Dr. Sarah Lee',
      specialty: 'General Medicine',
      date: '2026-06-11',
      time: '09:30',
      duration: 20,
      type: 'audio',
      status: 'completed',
      notes: 'Routine check-up completed',
    },
    {
      id: 'TC-2003',
      patientName: 'Sofia Ramirez',
      patientAvatar: 'SR',
      doctor: 'Dr. Alan Park',
      specialty: 'Dermatology',
      date: '2026-06-11',
      time: '10:00',
      duration: 25,
      type: 'video',
      status: 'scheduled',
      notes: 'Eczema progress review',
    },
    {
      id: 'TC-2004',
      patientName: 'Robert Hayes',
      patientAvatar: 'RH',
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiology',
      date: '2026-06-11',
      time: '11:00',
      duration: 40,
      type: 'video',
      status: 'scheduled',
      notes: 'Post-surgery evaluation',
    },
    {
      id: 'TC-2005',
      patientName: 'Priya Nair',
      patientAvatar: 'PN',
      doctor: 'Dr. Sarah Lee',
      specialty: 'General Medicine',
      date: '2026-06-12',
      time: '10:00',
      duration: 30,
      type: 'chat',
      status: 'scheduled',
      notes: 'Diabetes management discussion',
    },
    {
      id: 'TC-2006',
      patientName: 'David Chen',
      patientAvatar: 'DC',
      doctor: 'Dr. Meera Patel',
      specialty: 'Psychiatry',
      date: '2026-06-12',
      time: '11:30',
      duration: 60,
      type: 'video',
      status: 'cancelled',
      notes: 'Session cancelled by patient',
    },
    {
      id: 'TC-2007',
      patientName: 'Anna Williams',
      patientAvatar: 'AW',
      doctor: 'Dr. Alan Park',
      specialty: 'Dermatology',
      date: '2026-06-13',
      time: '14:00',
      duration: 20,
      type: 'video',
      status: 'scheduled',
      notes: 'Psoriasis treatment review',
    },
  ]);

  filteredAppointments = computed(() => {
    const status = this.filterStatus();
    const all = this.appointments();
    if (status === 'all') return all;
    return all.filter((a) => a.status === status);
  });

  stats = computed(() => {
    const all = this.appointments();
    return {
      total: all.length,
      scheduled: all.filter((a) => a.status === 'scheduled').length,
      completed: all.filter((a) => a.status === 'completed').length,
      cancelled: all.filter((a) => a.status === 'cancelled').length,
    };
  });

  today = new Date().toISOString().split('T')[0];

  setFilter(status: string) {
    this.filterStatus.set(status);
  }

  setView(mode: 'list' | 'calendar') {
    this.viewMode.set(mode);
  }

  getTypeIcon(type: string): string {
    const map: Record<string, string> = {
      video: 'video_call',
      audio: 'call',
      chat: 'chat',
    };
    return map[type] ?? 'video_call';
  }

  formatTime(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
  }

  groupedByDate = computed(() => {
    const sorted = [...this.filteredAppointments()].sort(
      (a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime()
    );
    const groups: Record<string, Appointment[]> = {};
    for (const apt of sorted) {
      if (!groups[apt.date]) groups[apt.date] = [];
      groups[apt.date].push(apt);
    }
    return Object.entries(groups).map(([date, apts]) => ({ date, apts }));
  });

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  isToday(dateStr: string): boolean {
    return dateStr === this.today;
  }
}
