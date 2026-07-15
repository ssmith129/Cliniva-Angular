import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Billing } from './billing.model';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private data: Billing[] = [
    {
      id: 1,
      invoiceId: '#INV-001',
      patientName: 'John Doe',
      img: 'assets/images/user/user1.jpg',
      patientId: 'P-001',
      consultationDate: '2023-10-25',
      serviceType: 'Consultation',
      amount: 150,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      paymentDate: '2023-10-25',
    },
    {
      id: 2,
      invoiceId: '#INV-002',
      patientName: 'Jane Smith',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-002',
      consultationDate: '2023-10-26',
      serviceType: 'Lab Test',
      amount: 50,
      paymentStatus: 'Pending',
    },
    {
      id: 3,
      invoiceId: '#INV-003',
      patientName: 'Mike Johnson',
      img: 'assets/images/user/user3.jpg',
      patientId: 'P-003',
      consultationDate: '2023-10-27',
      serviceType: 'X-Ray',
      amount: 80,
      paymentStatus: 'Unpaid',
    },
    {
      id: 4,
      invoiceId: '#INV-004',
      patientName: 'Emily Davis',
      img: 'assets/images/user/user4.jpg',
      patientId: 'P-004',
      consultationDate: '2023-10-28',
      serviceType: 'MRI Scan',
      amount: 450,
      paymentStatus: 'Paid',
      paymentMethod: 'Insurance',
      paymentDate: '2023-10-28',
    },
    {
      id: 5,
      invoiceId: '#INV-005',
      patientName: 'Chris Lee',
      img: 'assets/images/user/user5.jpg',
      patientId: 'P-005',
      consultationDate: '2023-10-29',
      serviceType: 'Consultation',
      amount: 150,
      paymentStatus: 'Pending',
    },
    {
      id: 6,
      invoiceId: '#INV-006',
      patientName: 'Anna Brown',
      img: 'assets/images/user/user6.jpg',
      patientId: 'P-006',
      consultationDate: '2023-10-30',
      serviceType: 'Pharmacy',
      amount: 35,
      paymentStatus: 'Paid',
      paymentMethod: 'Cash',
      paymentDate: '2023-10-30',
    },
    {
      id: 7,
      invoiceId: '#INV-007',
      patientName: 'David Wilson',
      img: 'assets/images/user/user7.jpg',
      patientId: 'P-007',
      consultationDate: '2023-10-31',
      serviceType: 'Blood Test',
      amount: 60,
      paymentStatus: 'Unpaid',
    },
    {
      id: 8,
      invoiceId: '#INV-008',
      patientName: 'Laura White',
      img: 'assets/images/user/user8.jpg',
      patientId: 'P-008',
      consultationDate: '2023-11-01',
      serviceType: 'Consultation',
      amount: 150,
      paymentStatus: 'Paid',
      paymentMethod: 'Debit Card',
      paymentDate: '2023-11-01',
    },
    {
      id: 9,
      invoiceId: '#INV-009',
      patientName: 'James Miller',
      img: 'assets/images/user/user9.jpg',
      patientId: 'P-009',
      consultationDate: '2023-11-02',
      serviceType: 'Physical Therapy',
      amount: 120,
      paymentStatus: 'Pending',
    },
    {
      id: 10,
      invoiceId: '#INV-010',
      patientName: 'Sophia Taylor',
      img: 'assets/images/user/user10.jpg',
      patientId: 'P-010',
      consultationDate: '2023-11-03',
      serviceType: 'Vaccination',
      amount: 45,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      paymentDate: '2023-11-03',
    },
    {
      id: 11,
      invoiceId: '#INV-011',
      patientName: 'Lucas Martinez',
      img: 'assets/images/user/user11.jpg',
      patientId: 'P-011',
      consultationDate: '2023-11-04',
      serviceType: 'Emergency Room',
      amount: 800,
      paymentStatus: 'Unpaid',
    },
    {
      id: 12,
      invoiceId: '#INV-012',
      patientName: 'Isabella Rodriguez',
      img: 'assets/images/user/user2.jpg',
      patientId: 'P-012',
      consultationDate: '2023-11-05',
      serviceType: 'Consultation',
      amount: 150,
      paymentStatus: 'Paid',
      paymentMethod: 'Insurance',
      paymentDate: '2023-11-05',
    },
  ];

  private dataSubject = new BehaviorSubject<Billing[]>(this.data);

  constructor() {}

  getAllBillings(): Observable<Billing[]> {
    return this.dataSubject.asObservable();
  }

  addBilling(billing: Billing): void {
    billing.id = this.data.length + 1;
    this.data.unshift(billing);
    this.dataSubject.next(this.data);
  }

  updateBilling(billing: Billing): void {
    const index = this.data.findIndex((d) => d.id === billing.id);
    if (index !== -1) {
      this.data[index] = billing;
      this.dataSubject.next(this.data);
    }
  }

  deleteBilling(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
