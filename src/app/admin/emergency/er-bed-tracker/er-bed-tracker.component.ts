import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface Patient {
  name: string;
  age: number;
  gender: string;
  patientId: string;
  admissionDate: string;
  assignedDr: string;
  assignedNurse: string;
}

export interface Bed {
  id: string;
  name: string; // e.g. "101"
  status: 'Not Ready' | 'Arrived' | 'Open' | 'Admitted' | 'Hold' | 'Wait' | 'Registered';
  patient?: Patient;
}

@Component({
  selector: 'app-er-bed-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BreadcrumbComponent
  ],
  templateUrl: './er-bed-tracker.component.html',
  styleUrl: './er-bed-tracker.component.scss'
})
export class ErBedTrackerComponent {
  wards: string[] = [
    'Emergency',
    'General Ward',
    'Special Unit',
    'Specific Care',
    'Rehabilitation',
    'Covid',
    'ICU',
    'Aged Care',
    'Intensive Care',
    'Surgical'
  ];

  roomNos: string[] = ['All', '100s', '200s', '300s', '400s', '500s', '600s', '700s', '800s'];
  bedNos: string[] = ['All', '01-08', '09-16', '17-24'];
  statuses: string[] = ['All', 'Not Ready', 'Arrived', 'Open', 'Admitted', 'Hold', 'Wait', 'Registered'];

  selectedWard: string = 'General Ward';
  selectedRoomNo: string = 'All';
  selectedBedNo: string = 'All';
  selectedStatus: string = 'All';

  // Map to store ward-specific beds
  wardBedsMap: { [wardName: string]: Bed[] } = {};
  selectedBed: Bed | null = null;

  constructor() {
    // Generate bed data for each ward
    this.wards.forEach(ward => {
      this.wardBedsMap[ward] = this.generateBeds(ward);
    });
    // Set General Ward active
    this.selectWard('General Ward');
  }

  generateBeds(ward: string): Bed[] {
    const statuses: Bed['status'][] = ['Admitted', 'Open', 'Not Ready', 'Registered', 'Arrived', 'Wait', 'Hold'];
    
    // Seed general ward specific beds matching layout image
    if (ward === 'General Ward') {
      return [
        { id: '101', name: '101', status: 'Admitted', patient: { name: 'James Carter', age: 45, gender: 'Male', patientId: '20145', admissionDate: '05/12/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '102', name: '102', status: 'Admitted', patient: { name: 'Maria Garcia', age: 29, gender: 'Female', patientId: '21054', admissionDate: '06/01/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Emma Watson' } },
        { id: '103', name: '103', status: 'Admitted', patient: { name: 'Emma Wilson', age: 34, gender: 'Female', patientId: '22415', admissionDate: '06/03/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Liam Smith' } },
        { id: '104', name: '104', status: 'Admitted', patient: { name: 'John Doe', age: 52, gender: 'Male', patientId: '23512', admissionDate: '06/04/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '105', name: '105', status: 'Admitted', patient: { name: 'Robert Brown', age: 61, gender: 'Male', patientId: '24102', admissionDate: '06/05/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '106', name: '106', status: 'Admitted', patient: { name: 'Linda Martinez', age: 41, gender: 'Female', patientId: '25184', admissionDate: '06/06/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '107', name: '107', status: 'Admitted', patient: { name: 'William Jones', age: 50, gender: 'Male', patientId: '25391', admissionDate: '06/07/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '108', name: '108', status: 'Open' },
        { id: '109', name: '109', status: 'Open' },
        { id: '110', name: '110', status: 'Admitted', patient: { name: 'Elizabeth Taylor', age: 67, gender: 'Female', patientId: '25412', admissionDate: '06/08/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '111', name: '111', status: 'Admitted', patient: { name: 'David Miller', age: 58, gender: 'Male', patientId: '25488', admissionDate: '06/08/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '112', name: '112', status: 'Admitted', patient: { name: 'Richard Davis', age: 43, gender: 'Male', patientId: '25501', admissionDate: '06/09/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '113', name: '113', status: 'Admitted', patient: { name: 'Susan Wilson', age: 39, gender: 'Female', patientId: '25603', admissionDate: '06/09/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '114', name: '114', status: 'Registered' },
        { id: '115', name: '115', status: 'Admitted', patient: { name: 'Joseph Thomas', age: 72, gender: 'Male', patientId: '25611', admissionDate: '06/09/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '116', name: '116', status: 'Admitted', patient: { name: 'Charles White', age: 49, gender: 'Male', patientId: '25642', admissionDate: '06/09/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '117', name: '117', status: 'Hold', patient: { name: 'Alexander Huston', age: 32, gender: 'Male', patientId: '25698', admissionDate: '10/25/2020', assignedDr: 'Dr. Chriss Geller', assignedNurse: 'Kip Andriss' } },
        { id: '118', name: '118', status: 'Admitted', patient: { name: 'Patricia Jackson', age: 55, gender: 'Female', patientId: '25701', admissionDate: '06/10/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '119', name: '119', status: 'Admitted', patient: { name: 'Christopher Martin', age: 31, gender: 'Male', patientId: '25710', admissionDate: '06/10/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
        { id: '120', name: '120', status: 'Registered' },
        { id: '121', name: '121', status: 'Registered' },
        { id: '122', name: '122', status: 'Admitted', patient: { name: 'Nancy Anderson', age: 64, gender: 'Female', patientId: '25712', admissionDate: '06/10/2026', assignedDr: 'Dr. Ryan Cooper', assignedNurse: 'Nurse Liam Smith' } },
        { id: '123', name: '123', status: 'Open' },
        { id: '124', name: '124', status: 'Admitted', patient: { name: 'Matthew Taylor', age: 47, gender: 'Male', patientId: '25722', admissionDate: '06/10/2026', assignedDr: 'Dr. Sarah Jenkins', assignedNurse: 'Nurse Emma Watson' } },
      ];
    }
    
    // For other Wards, generate different bed counts (24 beds) and states dynamically
    const bedsList: Bed[] = [];
    const firstDigit = (this.wards.indexOf(ward) % 8) + 1; // 1 to 8
    
    for (let i = 1; i <= 24; i++) {
      const idStr = `${firstDigit}${i < 10 ? '0' + i : i}`;
      const statusIdx = (i + firstDigit) % statuses.length;
      const status = statuses[statusIdx];
      
      const bed: Bed = {
        id: idStr,
        name: idStr,
        status: status
      };
      
      if (status === 'Admitted' || status === 'Hold') {
        bed.patient = {
          name: `Patient ${ward.split(' ')[0]} ${idStr}`,
          age: 20 + (i * 2) % 60,
          gender: i % 2 === 0 ? 'Male' : 'Female',
          patientId: `ID-${1000 + i}`,
          admissionDate: '06/10/2026',
          assignedDr: 'Dr. Sarah Jenkins',
          assignedNurse: 'Nurse Emma Watson'
        };
      }
      bedsList.push(bed);
    }
    return bedsList;
  }

  selectWard(ward: string) {
    this.selectedWard = ward;
    // Set selectedBed to the first bed of this ward
    const wardBeds = this.wardBedsMap[ward] || [];
    this.selectedBed = wardBeds.find(b => b.id.endsWith('17')) || wardBeds[0] || null;
  }

  selectBed(bed: Bed) {
    this.selectedBed = bed;
  }

  getFilteredBeds(): Bed[] {
    const wardBeds = this.wardBedsMap[this.selectedWard] || [];
    return wardBeds.filter(bed => {
      // Filter by room
      if (this.selectedRoomNo !== 'All') {
        const firstDigit = bed.id.charAt(0);
        if (this.selectedRoomNo !== `${firstDigit}00s`) return false;
      }
      
      // Filter by status
      if (this.selectedStatus !== 'All') {
        if (bed.status !== this.selectedStatus) return false;
      }

      // Filter by Bed range dropdown (using last two digits)
      if (this.selectedBedNo !== 'All') {
        const lastTwo = parseInt(bed.id.slice(-2), 10);
        if (this.selectedBedNo === '01-08' && (lastTwo < 1 || lastTwo > 8)) return false;
        if (this.selectedBedNo === '09-16' && (lastTwo < 9 || lastTwo > 16)) return false;
        if (this.selectedBedNo === '17-24' && (lastTwo < 17 || lastTwo > 24)) return false;
      }

      return true;
    });
  }

  getStatusCount(status: 'Not Ready' | 'Arrived' | 'Open' | 'Admitted' | 'Hold' | 'Wait' | 'Registered'): number {
    const wardBeds = this.wardBedsMap[this.selectedWard] || [];
    return wardBeds.filter(b => b.status === status).length;
  }

  changeBedStatus(bed: Bed, newStatus: 'Not Ready' | 'Arrived' | 'Open' | 'Admitted' | 'Hold' | 'Wait' | 'Registered') {
    bed.status = newStatus;
    if (newStatus !== 'Admitted' && newStatus !== 'Hold') {
      bed.patient = undefined;
    } else if (!bed.patient) {
      bed.patient = {
        name: 'New Patient',
        age: 30,
        gender: 'Male',
        patientId: '28' + Math.floor(Math.random() * 900 + 100),
        admissionDate: new Date().toLocaleDateString(),
        assignedDr: 'Dr. Chriss Geller',
        assignedNurse: 'Kip Andriss'
      };
    }
  }

  onRefresh() {
    this.selectedRoomNo = 'All';
    this.selectedBedNo = 'All';
    this.selectedStatus = 'All';
    const wardBeds = this.wardBedsMap[this.selectedWard] || [];
    this.selectedBed = wardBeds.find(b => b.id.endsWith('17')) || wardBeds[0] || null;
  }

  onConfirm() {
    alert(`Bed status saved successfully! Current Ward: ${this.selectedWard}`);
  }
}
