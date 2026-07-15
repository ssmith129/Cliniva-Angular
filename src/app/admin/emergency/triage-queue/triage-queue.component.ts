import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  esiLevel: number;
  timeIn: string;
}

@Component({
  selector: 'app-triage-queue',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, DragDropModule, BreadcrumbComponent],
  templateUrl: './triage-queue.component.html',
  styleUrl: './triage-queue.component.scss'
})
export class TriageQueueComponent {
  untriaged: Patient[] = [
    { id: 'ER-1001', name: 'John Doe', age: 45, gender: 'M', chiefComplaint: 'Chest Pain', esiLevel: 2, timeIn: '10:15 AM' },
    { id: 'ER-1002', name: 'Jane Smith', age: 28, gender: 'F', chiefComplaint: 'Sprained Ankle', esiLevel: 4, timeIn: '10:20 AM' }
  ];

  waiting: Patient[] = [
    { id: 'ER-1003', name: 'Michael Brown', age: 60, gender: 'M', chiefComplaint: 'Shortness of Breath', esiLevel: 2, timeIn: '09:45 AM' },
    { id: 'ER-1004', name: 'Emily Davis', age: 12, gender: 'F', chiefComplaint: 'Fever', esiLevel: 3, timeIn: '09:50 AM' },
    { id: 'ER-1005', name: 'Sarah Wilson', age: 35, gender: 'F', chiefComplaint: 'Abdominal Pain', esiLevel: 3, timeIn: '10:05 AM' }
  ];

  inTreatment: Patient[] = [
    { id: 'ER-1006', name: 'Robert Taylor', age: 50, gender: 'M', chiefComplaint: 'Severe Bleeding', esiLevel: 1, timeIn: '09:10 AM' }
  ];

  discharged: Patient[] = [
    { id: 'ER-1007', name: 'William Anderson', age: 22, gender: 'M', chiefComplaint: 'Minor Laceration', esiLevel: 5, timeIn: '08:30 AM' }
  ];

  drop(event: CdkDragDrop<Patient[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getEsiColor(level: number): string {
    switch (level) {
      case 1: return 'bg-red';
      case 2: return 'bg-orange';
      case 3: return 'bg-blue';
      case 4: return 'bg-green';
      case 5: return 'bg-grey';
      default: return 'bg-grey';
    }
  }

  getEsiLabel(level: number): string {
    switch (level) {
      case 1: return 'Level 1: Resuscitation';
      case 2: return 'Level 2: Emergent';
      case 3: return 'Level 3: Urgent';
      case 4: return 'Level 4: Less Urgent';
      case 5: return 'Level 5: Non-Urgent';
      default: return 'Unknown';
    }
  }
}
