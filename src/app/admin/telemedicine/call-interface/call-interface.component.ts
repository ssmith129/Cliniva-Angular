import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface ActiveCall {
  patientId: string;
  patientName: string;
  patientAvatar: string;
  doctorName: string;
  specialty: string;
  duration: number; // seconds
  status: 'connecting' | 'active' | 'on-hold' | 'ended';
  isVideoOn: boolean;
  isMicOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
}

interface ChatMessage {
  from: 'doctor' | 'patient';
  text: string;
  time: string;
}

interface VitalSign {
  label: string;
  value: string;
  unit: string;
  icon: string;
  status: 'normal' | 'warning' | 'critical';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-call-interface',
  templateUrl: './call-interface.component.html',
  styleUrls: ['./call-interface.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
})
export class CallInterfaceComponent implements OnInit, OnDestroy {
  private timerRef: ReturnType<typeof setInterval> | null = null;

  activeCall = signal<ActiveCall>({
    patientId: 'P-1042',
    patientName: 'Marcus Johnson',
    patientAvatar: 'MJ',
    doctorName: 'Dr. Sarah Lee',
    specialty: 'General Medicine',
    duration: 0,
    status: 'active',
    isVideoOn: true,
    isMicOn: true,
    isScreenSharing: false,
    isRecording: true,
  });

  chatMessages = signal<ChatMessage[]>([
    {
      from: 'patient',
      text: 'Hello doctor, can you see me clearly?',
      time: '09:12 AM',
    },
    {
      from: 'doctor',
      text: 'Yes, I can see you perfectly. How are you feeling today?',
      time: '09:12 AM',
    },
    {
      from: 'patient',
      text: 'I have had a headache and slight fever since yesterday.',
      time: '09:13 AM',
    },
    {
      from: 'doctor',
      text: 'I see. Let me review your recent vitals. Give me a moment.',
      time: '09:13 AM',
    },
  ]);

  vitals = signal<VitalSign[]>([
    {
      label: 'Blood Pressure',
      value: '128/84',
      unit: 'mmHg',
      icon: 'favorite',
      status: 'warning',
    },
    {
      label: 'Heart Rate',
      value: '88',
      unit: 'bpm',
      icon: 'monitor_heart',
      status: 'normal',
    },
    {
      label: 'Temperature',
      value: '37.8',
      unit: '°C',
      icon: 'thermostat',
      status: 'warning',
    },
    { label: 'SpO₂', value: '97', unit: '%', icon: 'air', status: 'normal' },
    {
      label: 'Respiratory Rate',
      value: '18',
      unit: '/min',
      icon: 'air',
      status: 'normal',
    },
    {
      label: 'Blood Glucose',
      value: '105',
      unit: 'mg/dL',
      icon: 'water_drop',
      status: 'normal',
    },
  ]);

  activeSidePanel = signal<'chat' | 'notes' | 'vitals'>('vitals');

  doctorNotes = signal<string>(
    'Patient reports headache and mild fever since yesterday.\nBP slightly elevated. Will monitor.\nRecommend rest and hydration. Follow up in 3 days if no improvement.',
  );

  ngOnInit() {
    this.timerRef = setInterval(() => {
      this.activeCall.update((c) => ({ ...c, duration: c.duration + 1 }));
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerRef) clearInterval(this.timerRef);
  }

  get formattedDuration(): string {
    const d = this.activeCall().duration;
    const m = Math.floor(d / 60)
      .toString()
      .padStart(2, '0');
    const s = (d % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  toggleVideo() {
    this.activeCall.update((c) => ({ ...c, isVideoOn: !c.isVideoOn }));
  }

  toggleMic() {
    this.activeCall.update((c) => ({ ...c, isMicOn: !c.isMicOn }));
  }

  toggleScreenShare() {
    this.activeCall.update((c) => ({
      ...c,
      isScreenSharing: !c.isScreenSharing,
    }));
  }

  toggleRecording() {
    this.activeCall.update((c) => ({ ...c, isRecording: !c.isRecording }));
  }

  endCall() {
    this.activeCall.update((c) => ({ ...c, status: 'ended' }));
    if (this.timerRef) clearInterval(this.timerRef);
  }

  setSidePanel(panel: 'chat' | 'notes' | 'vitals') {
    this.activeSidePanel.set(panel);
  }
}
