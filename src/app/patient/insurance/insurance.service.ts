import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InsuranceClaim } from './insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private data: InsuranceClaim[] = [
    { id: 1, claimId: 'CLM001', policyId: 'POL-12345', claimDate: '2023-10-15', claimAmount: 1500, approvedAmount: 1200, claimType: 'Inpatient', status: 'Approved', submittedDate: '2023-10-10', processedDate: '2023-10-20' },
    { id: 2, claimId: 'CLM002', policyId: 'POL-12345', claimDate: '2023-11-05', claimAmount: 200, approvedAmount: 200, claimType: 'Outpatient', status: 'Approved', submittedDate: '2023-11-01', processedDate: '2023-11-10' },
    { id: 3, claimId: 'CLM003', policyId: 'POL-67890', claimDate: '2023-12-12', claimAmount: 5000, claimType: 'Surgery', status: 'Pending', submittedDate: '2023-12-05' },
    { id: 4, claimId: 'CLM004', policyId: 'POL-12345', claimDate: '2024-01-20', claimAmount: 100, claimType: 'Pharmacy', status: 'Rejected', submittedDate: '2024-01-15', processedDate: '2024-01-25' },
    { id: 5, claimId: 'CLM005', policyId: 'POL-67890', claimDate: '2024-02-05', claimAmount: 800, approvedAmount: 750, claimType: 'Consultation', status: 'Approved', submittedDate: '2024-02-01', processedDate: '2024-02-10' },
    { id: 6, claimId: 'CLM006', policyId: 'POL-12345', claimDate: '2024-02-15', claimAmount: 2500, claimType: 'Surgery', status: 'Pending', submittedDate: '2024-02-10' },
    { id: 7, claimId: 'CLM007', policyId: 'POL-67890', claimDate: '2024-03-01', claimAmount: 450, approvedAmount: 400, claimType: 'Laboratory', status: 'Approved', submittedDate: '2024-02-25', processedDate: '2024-03-05' },
    { id: 8, claimId: 'CLM008', policyId: 'POL-12345', claimDate: '2024-03-10', claimAmount: 150, claimType: 'Pharmacy', status: 'Approved', submittedDate: '2024-03-05', processedDate: '2024-03-15' },
    { id: 9, claimId: 'CLM009', policyId: 'POL-67890', claimDate: '2024-03-15', claimAmount: 3000, claimType: 'Inpatient', status: 'Pending', submittedDate: '2024-03-10' },
    { id: 10, claimId: 'CLM010', policyId: 'POL-12345', claimDate: '2024-03-20', claimAmount: 120, approvedAmount: 100, claimType: 'Outpatient', status: 'Approved', submittedDate: '2024-03-18', processedDate: '2024-03-22' },
    { id: 11, claimId: 'CLM011', policyId: 'POL-67890', claimDate: '2024-03-25', claimAmount: 500, claimType: 'Consultation', status: 'Rejected', submittedDate: '2024-03-22', processedDate: '2024-03-27' },
    { id: 12, claimId: 'CLM012', policyId: 'POL-12345', claimDate: '2024-03-28', claimAmount: 200, approvedAmount: 180, claimType: 'Laboratory', status: 'Approved', submittedDate: '2024-03-25', processedDate: '2024-03-30' },
  ];

  private dataSubject = new BehaviorSubject<InsuranceClaim[]>(this.data);

  constructor() { }

  getAllClaims(): Observable<InsuranceClaim[]> {
    return this.dataSubject.asObservable();
  }

  addClaim(claim: InsuranceClaim): void {
    claim.id = this.data.length + 1;
    this.data.unshift(claim);
    this.dataSubject.next(this.data);
  }

  updateClaim(claim: InsuranceClaim): void {
    const index = this.data.findIndex(c => c.id === claim.id);
    if (index !== -1) {
      this.data[index] = claim;
      this.dataSubject.next(this.data);
    }
  }

  deleteClaim(id: number): void {
    const index = this.data.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
