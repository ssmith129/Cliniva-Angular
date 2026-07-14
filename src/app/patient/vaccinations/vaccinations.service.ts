import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vaccination } from './vaccinations.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationsService {
  private data: Vaccination[] = [
    { id: 1, vaccineId: 'VAC001', vaccineName: 'COVID-19 (Pfizer)', vaccineType: 'mRNA', administeredDate: '2023-05-10', nextDueDate: '2023-11-10', administeredBy: 'Dr. Sarah Wilson', batchNumber: 'LOT12345', site: 'Left Arm', status: 'Completed' },
    { id: 2, vaccineId: 'VAC002', vaccineName: 'Influenza (Flu)', vaccineType: 'Inactivated', administeredDate: '2023-10-15', nextDueDate: '2024-10-15', administeredBy: 'Nurse Emily', batchNumber: 'FLU98765', site: 'Right Arm', status: 'Completed' },
    { id: 3, vaccineId: 'VAC003', vaccineName: 'Hepatitis B', vaccineType: 'Recombinant', administeredDate: '2023-12-01', nextDueDate: '2024-06-01', administeredBy: 'Dr. John Doe', batchNumber: 'HEP55443', site: 'Left Deltoid', status: 'Completed' },
    { id: 4, vaccineId: 'VAC004', vaccineName: 'Tetanus Booster', vaccineType: 'Toxoid', administeredBy: 'Dr. Michael Smith', batchNumber: 'TET11223', site: 'Right Arm', administeredDate: '', status: 'Scheduled' },
    { id: 5, vaccineId: 'VAC005', vaccineName: 'Measles, Mumps, Rubella (MMR)', vaccineType: 'Live-attenuated', administeredDate: '2023-01-20', nextDueDate: '', administeredBy: 'Dr. Sarah Wilson', batchNumber: 'MMR66778', site: 'Left Arm', status: 'Completed' },
    { id: 6, vaccineId: 'VAC006', vaccineName: 'Polio', vaccineType: 'Inactivated', administeredDate: '2023-02-15', nextDueDate: '', administeredBy: 'Nurse Emily', batchNumber: 'POL33445', site: 'Right Arm', status: 'Completed' },
    { id: 7, vaccineId: 'VAC007', vaccineName: 'Chickenpox (Varicella)', vaccineType: 'Live-attenuated', administeredDate: '2023-03-10', nextDueDate: '2023-09-10', administeredBy: 'Dr. John Doe', batchNumber: 'VAR55667', site: 'Left Deltoid', status: 'Completed' },
    { id: 8, vaccineId: 'VAC008', vaccineName: 'Hepatitis A', vaccineType: 'Inactivated', administeredDate: '2023-04-05', nextDueDate: '2023-10-05', administeredBy: 'Dr. Michael Smith', batchNumber: 'HEPA1122', site: 'Right Arm', status: 'Completed' },
    { id: 9, vaccineId: 'VAC009', vaccineName: 'Meningococcal', vaccineType: 'Conjugate', administeredDate: '2023-06-15', nextDueDate: '2024-06-15', administeredBy: 'Dr. Sarah Wilson', batchNumber: 'MEN88990', site: 'Left Arm', status: 'Completed' },
    { id: 10, vaccineId: 'VAC010', vaccineName: 'Pneumococcal', vaccineType: 'Conjugate', administeredDate: '2023-07-20', nextDueDate: '2024-07-20', administeredBy: 'Nurse Emily', batchNumber: 'PNEU4455', site: 'Right Arm', status: 'Completed' },
    { id: 11, vaccineId: 'VAC011', vaccineName: 'Shingles', vaccineType: 'Recombinant', administeredDate: '2023-08-25', nextDueDate: '2024-08-25', administeredBy: 'Dr. John Doe', batchNumber: 'SHI22334', site: 'Left Deltoid', status: 'Completed' },
    { id: 12, vaccineId: 'VAC012', vaccineName: 'Yellow Fever', vaccineType: 'Live-attenuated', administeredBy: 'Dr. Michael Smith', batchNumber: 'YEL99887', site: 'Right Arm', administeredDate: '', status: 'Scheduled' },
  ];

  private dataSubject = new BehaviorSubject<Vaccination[]>(this.data);

  constructor() { }

  getAllVaccinations(): Observable<Vaccination[]> {
    return this.dataSubject.asObservable();
  }

  addVaccination(vaccination: Vaccination): void {
    vaccination.id = this.data.length + 1;
    this.data.unshift(vaccination);
    this.dataSubject.next(this.data);
  }

  updateVaccination(vaccination: Vaccination): void {
    const index = this.data.findIndex(v => v.id === vaccination.id);
    if (index !== -1) {
      this.data[index] = vaccination;
      this.dataSubject.next(this.data);
    }
  }

  deleteVaccination(id: number): void {
    const index = this.data.findIndex(v => v.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
