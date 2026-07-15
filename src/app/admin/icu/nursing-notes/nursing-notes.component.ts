import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nursing-notes',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './nursing-notes.component.html',
  styleUrls: ['./nursing-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NursingNotesComponent {
  newNote = {
    patient: '',
    shift: 'Morning',
    content: ''
  };

  notes = [
    {
      author: 'Nurse Alice',
      time: '12:30 PM',
      patient: 'Bed 01 - John Smith',
      shift: 'Morning',
      content: 'Patient responsive. IV fluids adjusted as per new orders. No complaints of pain.'
    },
    {
      author: 'Nurse Bob',
      time: '10:15 AM',
      patient: 'Bed 02 - Emily Carter',
      shift: 'Morning',
      content: 'SpO2 levels fluctuating between 90-93%. Doctor notified. Increasing O2 flow slightly.'
    },
    {
      author: 'Nurse Charlie',
      time: '08:00 AM',
      patient: 'Bed 03 - Michael Lee',
      shift: 'Night',
      content: 'Handoff complete. Patient slept through most of the night. Vitals stable.'
    }
  ];

  editingIndex: number | null = null;

  addNote() {
    if (this.newNote.patient && this.newNote.content) {
      if (this.editingIndex !== null) {
        this.notes[this.editingIndex] = {
          ...this.notes[this.editingIndex],
          patient: this.newNote.patient,
          shift: this.newNote.shift,
          content: this.newNote.content
        };
        this.editingIndex = null;
      } else {
        this.notes.unshift({
          author: 'Nurse Current',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          patient: this.newNote.patient,
          shift: this.newNote.shift,
          content: this.newNote.content
        });
      }
      this.newNote = {
        patient: '',
        shift: 'Morning',
        content: ''
      };
    }
  }

  editNote(note: { patient: string; shift: string; content: string }, idx: number) {
    this.newNote = {
      patient: note.patient,
      shift: note.shift,
      content: note.content
    };
    this.editingIndex = idx;
  }

  deleteNote(idx: number) {
    this.notes.splice(idx, 1);
    if (this.editingIndex === idx) {
      this.cancelEdit();
    } else if (this.editingIndex !== null && this.editingIndex > idx) {
      this.editingIndex--;
    }
  }

  cancelEdit() {
    this.newNote = {
      patient: '',
      shift: 'Morning',
      content: ''
    };
    this.editingIndex = null;
  }
}
