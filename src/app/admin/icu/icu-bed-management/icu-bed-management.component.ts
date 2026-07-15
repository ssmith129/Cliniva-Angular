import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

export interface Bed {
  id: string;
  status: 'Occupied' | 'Available' | 'Cleaning' | 'Maintenance';
  patient: string | null;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-icu-bed-management',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './icu-bed-management.component.html',
  styleUrls: ['./icu-bed-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcuBedManagementComponent {
  beds: Bed[] = [
    { id: 'Bed 01', status: 'Occupied', patient: 'John Smith', icon: 'hotel', color: '#ff4d4d' },
    { id: 'Bed 02', status: 'Occupied', patient: 'Emily Carter', icon: 'hotel', color: '#ff4d4d' },
    { id: 'Bed 03', status: 'Occupied', patient: 'Michael Lee', icon: 'hotel', color: '#ff4d4d' },
    { id: 'Bed 04', status: 'Cleaning', patient: null, icon: 'cleaning_services', color: '#ffc107' },
    { id: 'Bed 05', status: 'Available', patient: null, icon: 'check_circle', color: '#4caf50' },
    { id: 'Bed 06', status: 'Available', patient: null, icon: 'check_circle', color: '#4caf50' },
    { id: 'Bed 07', status: 'Maintenance', patient: null, icon: 'build', color: '#9e9e9e' },
    { id: 'Bed 08', status: 'Available', patient: null, icon: 'check_circle', color: '#4caf50' },
  ];

  statusConfig = {
    'Occupied': { icon: 'hotel', color: '#ff4d4d' },
    'Available': { icon: 'check_circle', color: '#4caf50' },
    'Cleaning': { icon: 'cleaning_services', color: '#ffc107' },
    'Maintenance': { icon: 'build', color: '#9e9e9e' }
  };

  currentBed: Partial<Bed> = {
    id: '',
    status: 'Available',
    patient: ''
  };

  editingIndex: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  saveBed() {
    const status = this.currentBed.status || 'Available';
    const config = this.statusConfig[status];
    const patientName = status === 'Occupied' ? (this.currentBed.patient || 'Unknown Patient') : null;
    
    const bedData: Bed = {
      id: this.currentBed.id || `Bed ${String(this.beds.length + 1).padStart(2, '0')}`,
      status: status,
      patient: patientName,
      icon: config.icon,
      color: config.color
    };

    if (this.editingIndex !== null) {
      this.beds[this.editingIndex] = bedData;
      this.editingIndex = null;
    } else {
      if (!this.currentBed.id) {
        const nextNum = this.beds.length + 1;
        bedData.id = `Bed ${String(nextNum).padStart(2, '0')}`;
      }
      this.beds.push(bedData);
    }

    this.resetForm();
  }

  editBed(bed: Bed, index: number) {
    this.currentBed = {
      id: bed.id,
      status: bed.status,
      patient: bed.patient || ''
    };
    this.editingIndex = index;
    this.cdr.markForCheck();
  }

  deleteBed(index: number) {
    this.beds.splice(index, 1);
    if (this.editingIndex === index) {
      this.resetForm();
    } else if (this.editingIndex !== null && this.editingIndex > index) {
      this.editingIndex--;
    }
    this.cdr.markForCheck();
  }

  resetForm() {
    this.currentBed = {
      id: '',
      status: 'Available',
      patient: ''
    };
    this.editingIndex = null;
    this.cdr.markForCheck();
  }
}
