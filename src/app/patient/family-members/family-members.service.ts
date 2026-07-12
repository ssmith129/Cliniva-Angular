import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FamilyMember } from './family-members.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyMembersService {
  private data: FamilyMember[] = [
    { id: 1, name: 'Sarah Johnson', relation: 'Spouse', dob: '1985-05-20', gender: 'Female', bloodGroup: 'A+', phone: '123-456-7890', email: 'sarah@example.com', status: 'Active' },
    { id: 2, name: 'Michael Johnson Jr.', relation: 'Son', dob: '2015-10-12', gender: 'Male', bloodGroup: 'A+', phone: '123-456-7891', email: 'michaeljr@example.com', status: 'Active' },
    { id: 3, name: 'Emily Johnson', relation: 'Daughter', dob: '2018-03-25', gender: 'Female', bloodGroup: 'O+', phone: '123-456-7892', email: 'emily@example.com', status: 'Active' },
    { id: 4, name: 'Robert Johnson', relation: 'Father', dob: '1955-12-05', gender: 'Male', bloodGroup: 'B-', phone: '123-456-7893', status: 'Inactive' },
    { id: 5, name: 'Linda Johnson', relation: 'Mother', dob: '1958-08-14', gender: 'Female', bloodGroup: 'O-', phone: '123-456-7894', email: 'linda@example.com', status: 'Active' },
    { id: 6, name: 'James Johnson', relation: 'Brother', dob: '1988-02-28', gender: 'Male', bloodGroup: 'AB+', phone: '123-456-7895', email: 'james@example.com', status: 'Active' },
    { id: 7, name: 'Patricia Johnson', relation: 'Sister', dob: '1992-06-15', gender: 'Female', bloodGroup: 'A-', phone: '123-456-7896', email: 'patricia@example.com', status: 'Active' },
    { id: 8, name: 'Thomas Wilson', relation: 'Uncle', dob: '1962-11-20', gender: 'Male', bloodGroup: 'O+', phone: '123-456-7897', status: 'Inactive' },
    { id: 9, name: 'Elizabeth Wilson', relation: 'Aunt', dob: '1965-04-10', gender: 'Female', bloodGroup: 'B+', phone: '123-456-7898', status: 'Active' },
    { id: 10, name: 'William Brown', relation: 'Grandfather', dob: '1935-01-25', gender: 'Male', bloodGroup: 'A+', phone: '123-456-7899', status: 'Inactive' },
    { id: 11, name: 'Mary Brown', relation: 'Grandmother', dob: '1940-09-18', gender: 'Female', bloodGroup: 'O+', phone: '123-456-7800', status: 'Active' },
    { id: 12, name: 'David Smith', relation: 'Cousin', dob: '1995-07-30', gender: 'Male', bloodGroup: 'AB-', phone: '123-456-7801', status: 'Active' },
  ];

  private dataSubject = new BehaviorSubject<FamilyMember[]>(this.data);

  constructor() { }

  getAllFamilyMembers(): Observable<FamilyMember[]> {
    return this.dataSubject.asObservable();
  }

  addFamilyMember(member: FamilyMember): void {
    member.id = this.data.length + 1;
    this.data.push(member);
    this.dataSubject.next(this.data);
  }

  updateFamilyMember(member: FamilyMember): void {
    const index = this.data.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.data[index] = member;
      this.dataSubject.next(this.data);
    }
  }

  deleteFamilyMember(id: number): void {
    const index = this.data.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
