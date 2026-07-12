import { Route } from '@angular/router';

export const DEPARTMENT_ROUTE: Route[] = [
  {
    path: 'department-list',
    loadComponent: () =>
      import('./department-list/department-list.component').then(
        (m) => m.DepartmentListComponent
      ),
  },
  {
    path: 'add-department',
    loadComponent: () =>
      import('./add-department/add-department.component').then(
        (m) => m.AddDepartmentComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('app/authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
