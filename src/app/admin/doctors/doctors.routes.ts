import { Route } from '@angular/router';

export const DOCTOR_ROUTE: Route[] = [
  {
    path: 'allDoctors',
    loadComponent: () =>
      import('./alldoctors/alldoctors.component').then(
        (m) => m.AlldoctorsComponent
      ),
  },
  {
    path: 'add-doctor',
    loadComponent: () =>
      import('./add-doctor/add-doctor.component').then(
        (m) => m.AddDoctorComponent
      ),
  },
  {
    path: 'edit-doctor',
    loadComponent: () =>
      import('./edit-doctor/edit-doctor.component').then(
        (m) => m.EditDoctorComponent
      ),
  },
  {
    path: 'assign-department',
    loadComponent: () =>
      import('./assign-department/assign-department.component').then(
        (m) => m.AssignDepartmentComponent
      ),
  },
  {
    path: 'shift-management',
    loadComponent: () =>
      import('./shift-management/shift-management.component').then(
        (m) => m.ShiftManagementComponent
      ),
  },
  {
    path: 'doctor-profile',
    loadComponent: () =>
      import('./doctor-profile/doctor-profile.component').then(
        (m) => m.DoctorProfileComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
