import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryRequest } from './inventory-requests.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryRequestsService {
  private data: InventoryRequest[] = [
    {
      id: 1,
      requestId: 'REQ-001',
      itemName: 'Surgical Gloves',
      category: 'Medical Supplies',
      quantity: 50,
      requestDate: '2023-10-25',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Approved',
      priority: 'High',
      approvedBy: 'Admin',
      approvalDate: '2023-10-26',
    },
    {
      id: 2,
      requestId: 'REQ-002',
      itemName: 'Paracetamol',
      category: 'Medicine',
      quantity: 100,
      requestDate: '2023-10-26',
      requestedBy: 'Dr. John Deo',
      status: 'Pending',
      priority: 'Normal',
    },
    {
      id: 3,
      requestId: 'REQ-003',
      itemName: 'Syringes',
      category: 'Medical Supplies',
      quantity: 200,
      requestDate: '2023-10-27',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Rejected',
      priority: 'Urgent',
    },
    {
      id: 4,
      requestId: 'REQ-004',
      itemName: 'Scalpels',
      category: 'Surgical Instruments',
      quantity: 20,
      requestDate: '2023-10-28',
      requestedBy: 'Dr. John Deo',
      status: 'Approved',
      priority: 'High',
      approvedBy: 'Admin',
      approvalDate: '2023-10-29',
    },
    {
      id: 5,
      requestId: 'REQ-005',
      itemName: 'Amoxicillin',
      category: 'Medicine',
      quantity: 150,
      requestDate: '2023-10-29',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Pending',
      priority: 'Normal',
    },
    {
      id: 6,
      requestId: 'REQ-006',
      itemName: 'Bandages',
      category: 'Medical Supplies',
      quantity: 300,
      requestDate: '2023-10-30',
      requestedBy: 'Dr. John Deo',
      status: 'Approved',
      priority: 'Normal',
      approvedBy: 'Admin',
      approvalDate: '2023-10-31',
    },
    {
      id: 7,
      requestId: 'REQ-007',
      itemName: 'Stethoscope',
      category: 'Medical Equipment',
      quantity: 5,
      requestDate: '2023-10-31',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 8,
      requestId: 'REQ-008',
      itemName: 'Wheelchair',
      category: 'Medical Equipment',
      quantity: 2,
      requestDate: '2023-11-01',
      requestedBy: 'Dr. John Deo',
      status: 'Approved',
      priority: 'High',
      approvedBy: 'Admin',
      approvalDate: '2023-11-02',
    },
    {
      id: 9,
      requestId: 'REQ-009',
      itemName: 'Face Masks',
      category: 'Medical Supplies',
      quantity: 500,
      requestDate: '2023-11-02',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Pending',
      priority: 'Normal',
    },
    {
      id: 10,
      requestId: 'REQ-010',
      itemName: 'Thermometers',
      category: 'Medical Equipment',
      quantity: 25,
      requestDate: '2023-11-03',
      requestedBy: 'Dr. John Deo',
      status: 'Approved',
      priority: 'Normal',
      approvedBy: 'Admin',
      approvalDate: '2023-11-04',
    },
    {
      id: 11,
      requestId: 'REQ-011',
      itemName: 'Adhesive Tape',
      category: 'Medical Supplies',
      quantity: 100,
      requestDate: '2023-11-04',
      requestedBy: 'Dr. Sarah Wilson',
      status: 'Rejected',
      priority: 'Normal',
    },
    {
      id: 12,
      requestId: 'REQ-012',
      itemName: 'Saline Solution',
      category: 'Medicine',
      quantity: 50,
      requestDate: '2023-11-05',
      requestedBy: 'Dr. John Deo',
      status: 'Pending',
      priority: 'Urgent',
    },
  ];

  private dataSubject = new BehaviorSubject<InventoryRequest[]>(this.data);

  constructor() {}

  getAllInventoryRequests(): Observable<InventoryRequest[]> {
    return this.dataSubject.asObservable();
  }

  addInventoryRequest(request: InventoryRequest): void {
    request.id = this.data.length + 1;
    this.data.unshift(request);
    this.dataSubject.next(this.data);
  }

  updateInventoryRequest(request: InventoryRequest): void {
    const index = this.data.findIndex((d) => d.id === request.id);
    if (index !== -1) {
      this.data[index] = request;
      this.dataSubject.next(this.data);
    }
  }

  deleteInventoryRequest(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
