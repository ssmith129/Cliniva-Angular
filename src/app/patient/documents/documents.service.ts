import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from './documents.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private data: Document[] = [
    { id: 1, docId: 'DOC001', title: 'Lab Results - Blood Test', type: 'PDF', category: 'Laboratory', uploadDate: '2023-10-01', size: '2.5 MB', status: 'Approved' },
    { id: 2, docId: 'DOC002', title: 'Insurance Policy 2024', type: 'DOCX', category: 'Insurance', uploadDate: '2023-11-15', size: '1.2 MB', status: 'Approved' },
    { id: 3, docId: 'DOC003', title: 'X-Ray Report - Chest', type: 'JPG', category: 'Radiology', uploadDate: '2023-12-05', size: '4.8 MB', status: 'Approved' },
    { id: 4, docId: 'DOC004', title: 'Vaccination Certificate', type: 'PDF', category: 'Medical History', uploadDate: '2024-01-20', size: '0.5 MB', status: 'Approved' },
    { id: 5, docId: 'DOC005', title: 'MRI Scan - Lumbar Spine', type: 'DICOM', category: 'Radiology', uploadDate: '2024-02-10', size: '15.4 MB', status: 'Approved' },
    { id: 6, docId: 'DOC006', title: 'Discharge Summary - City Hospital', type: 'PDF', category: 'Medical History', uploadDate: '2024-02-15', size: '1.8 MB', status: 'Approved' },
    { id: 7, docId: 'DOC007', title: 'Prescription - Allergies', type: 'JPG', category: 'Prescription', uploadDate: '2024-03-01', size: '0.8 MB', status: 'Approved' },
    { id: 8, docId: 'DOC008', title: 'Annual Wellness Report', type: 'PDF', category: 'General', uploadDate: '2024-03-05', size: '2.1 MB', status: 'Approved' },
    { id: 9, docId: 'DOC009', title: 'Dental X-Ray', type: 'PNG', category: 'Dentistry', uploadDate: '2024-03-10', size: '3.5 MB', status: 'Approved' },
    { id: 10, docId: 'DOC010', title: 'Blood Sugar Log - Q1', type: 'XLSX', category: 'Laboratory', uploadDate: '2024-03-15', size: '0.3 MB', status: 'Approved' },
    { id: 11, docId: 'DOC011', title: 'Surgical Consent Form', type: 'PDF', category: 'Legal', uploadDate: '2024-03-20', size: '1.1 MB', status: 'Approved' },
    { id: 12, docId: 'DOC012', title: 'Referral Letter - Cardiology', type: 'PDF', category: 'Medical History', uploadDate: '2024-03-25', size: '0.9 MB', status: 'Approved' },
  ];

  private dataSubject = new BehaviorSubject<Document[]>(this.data);

  constructor() { }

  getAllDocuments(): Observable<Document[]> {
    return this.dataSubject.asObservable();
  }

  addDocument(doc: Document): void {
    doc.id = this.data.length + 1;
    this.data.push(doc);
    this.dataSubject.next(this.data);
  }

  updateDocument(doc: Document): void {
    const index = this.data.findIndex(d => d.id === doc.id);
    if (index !== -1) {
      this.data[index] = doc;
      this.dataSubject.next(this.data);
    }
  }

  deleteDocument(id: number): void {
    const index = this.data.findIndex(d => d.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
