import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ConsultationNote {
  id: string;
  patientName: string;
  patientAvatar: string;
  patientAge: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  chiefComplaint: string;
  clinicalNotes: string;
  diagnosis: string[];
  prescriptions: Prescription[];
  followUp: string;
  vitals: { bp: string; hr: string; temp: string; spo2: string };
  status: 'draft' | 'finalized' | 'shared';
}

interface Prescription {
  drug: string;
  dosage: string;
  frequency: string;
  duration: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-consultation-notes',
  templateUrl: './post-consultation-notes.component.html',
  styleUrls: ['./post-consultation-notes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, MatTooltipModule],
})
export class PostConsultationNotesComponent {
  notes = signal<ConsultationNote[]>([
    {
      id: 'PCN-001',
      patientName: 'Marcus Johnson',
      patientAvatar: 'MJ',
      patientAge: 52,
      doctor: 'Dr. Sarah Lee',
      specialty: 'General Medicine',
      date: '2026-06-11',
      time: '09:30',
      duration: 20,
      chiefComplaint: 'Headache and mild fever since yesterday',
      clinicalNotes:
        'Patient presented with complaints of frontal headache and low-grade fever (37.8°C). No nausea or vomiting. BP slightly elevated at 128/84 mmHg. No signs of infection. Advised rest and hydration. Paracetamol prescribed for symptomatic relief.',
      diagnosis: ['Tension headache', 'Mild pyrexia (fever)'],
      prescriptions: [
        { drug: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'TDS', duration: '3 days' },
        { drug: 'ORS Sachets', dosage: '1 sachet', frequency: 'BD', duration: '3 days' },
      ],
      followUp: '2026-06-14',
      vitals: { bp: '128/84', hr: '88', temp: '37.8', spo2: '97' },
      status: 'finalized',
    },
    {
      id: 'PCN-002',
      patientName: 'Emily Carter',
      patientAvatar: 'EC',
      patientAge: 34,
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiology',
      date: '2026-06-10',
      time: '09:00',
      duration: 30,
      chiefComplaint: 'Chest pain follow-up after ECG',
      clinicalNotes:
        'Follow-up consultation post-ECG review. Patient reports occasional palpitations but no chest pain in the last 2 weeks. ECG results show normal sinus rhythm. Advised continued medication and lifestyle modification.',
      diagnosis: ['Stable angina (improving)', 'Mild hypertension'],
      prescriptions: [
        { drug: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'OD', duration: '30 days' },
        { drug: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'OD', duration: '30 days' },
      ],
      followUp: '2026-07-10',
      vitals: { bp: '135/88', hr: '76', temp: '36.6', spo2: '98' },
      status: 'shared',
    },
    {
      id: 'PCN-003',
      patientName: 'Sofia Ramirez',
      patientAvatar: 'SR',
      patientAge: 28,
      doctor: 'Dr. Alan Park',
      specialty: 'Dermatology',
      date: '2026-06-09',
      time: '11:00',
      duration: 25,
      chiefComplaint: 'Eczema flare-up on forearms',
      clinicalNotes:
        'Patient presents with eczema flare-up on bilateral forearms. Skin appears erythematous and dry. No signs of secondary infection. Topical corticosteroid prescribed. Patient advised to use fragrance-free moisturiser.',
      diagnosis: ['Atopic dermatitis (flare-up)'],
      prescriptions: [
        { drug: 'Hydrocortisone 1% cream', dosage: 'Thin layer', frequency: 'BD', duration: '7 days' },
        { drug: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'OD', duration: '5 days' },
      ],
      followUp: '2026-06-23',
      vitals: { bp: '112/72', hr: '72', temp: '36.5', spo2: '99' },
      status: 'draft',
    },
  ]);

  selectedNote = signal<ConsultationNote | null>(this.notes()[0]);
  filterStatus = signal<string>('all');

  filteredNotes = computed(() => {
    const f = this.filterStatus();
    const list = this.notes();
    return f === 'all' ? list : list.filter((n) => n.status === f);
  });

  selectNote(note: ConsultationNote) {
    this.selectedNote.set(note);
  }

  finalizeNote(note: ConsultationNote) {
    this.notes.update((list) =>
      list.map((n) => (n.id === note.id ? { ...n, status: 'finalized' } : n))
    );
    this.selectedNote.set({ ...note, status: 'finalized' });
  }

  shareNote(note: ConsultationNote) {
    this.notes.update((list) =>
      list.map((n) => (n.id === note.id ? { ...n, status: 'shared' } : n))
    );
    this.selectedNote.set({ ...note, status: 'shared' });
  }

  setFilter(f: string) {
    this.filterStatus.set(f);
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
