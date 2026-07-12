import { Route } from '@angular/router';

export const STAFF_ROUTE: Route[] = [
  {
    path: 'all-staff',
    loadComponent: () =>
      import('./allstaff/allstaff.component').then(
        (m) => m.AllstaffComponent
      ),
  },
  {
    path: 'add-staff',
    loadComponent: () =>
      import('./add-staff/add-staff.component').then(
        (m) => m.AddStaffComponent
      ),
  },
  {
    path: 'edit-staff',
    loadComponent: () =>
      import('./edit-staff/edit-staff.component').then(
        (m) => m.EditStaffComponent
      ),
  },
  {
    path: 'staff-profile',
    loadComponent: () =>
      import('./staff-profile/staff-profile.component').then(
        (m) => m.StaffProfileComponent
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
