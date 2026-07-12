import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRole } from './users-roles-settings.model';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class UsersRolesSettingsService extends UnsubscribeOnDestroyAdapter {
  private httpClient = inject(HttpClient);

  isTblLoading = true;
  dataChange: BehaviorSubject<UserRole[]> = new BehaviorSubject<UserRole[]>([]);
  dialogData!: UserRole;

  get data(): UserRole[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUsersRoles(): Observable<UserRole[]> {
    const mockData: UserRole[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@hospital.com',
        role: 'Admin',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah.smith@hospital.com',
        role: 'Doctor',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.b@hospital.com',
        role: 'Nurse',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.d@hospital.com',
        role: 'Receptionist',
        status: 'Inactive',
        getRandomID: () => 0
      },
      {
        id: 5,
        name: 'David Wilson',
        email: 'david.w@hospital.com',
        role: 'Accountant',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 6,
        name: 'Jennifer Taylor',
        email: 'jen.t@hospital.com',
        role: 'Doctor',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 7,
        name: 'Robert Miller',
        email: 'bob.m@hospital.com',
        role: 'Nurse',
        status: 'Inactive',
        getRandomID: () => 0
      },
      {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa.a@hospital.com',
        role: 'Pharmacist',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 9,
        name: 'William Thomas',
        email: 'will.t@hospital.com',
        role: 'Lab Technician',
        status: 'Active',
        getRandomID: () => 0
      },
      {
        id: 10,
        name: 'Ashley Jackson',
        email: 'ashley.j@hospital.com',
        role: 'Admin',
        status: 'Active',
        getRandomID: () => 0
      }
    ];
    return of(mockData);
  }

  addUserRole(userRole: UserRole): Observable<UserRole> {
    this.dialogData = userRole;
    return of(userRole);
  }

  updateUserRole(userRole: UserRole): Observable<UserRole> {
    this.dialogData = userRole;
    return of(userRole);
  }

  deleteUserRole(id: number): Observable<number> {
    return of(id);
  }
}
