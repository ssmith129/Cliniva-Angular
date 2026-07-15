import { Route } from '@angular/router';

export const DASHBOARD_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'dashboard2',
    loadComponent: () =>
      import('./dashboard2/dashboard2.component').then(
        (m) => m.Dashboard2Component
      ),
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () =>
      import('../../doctor/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'patient-dashboard',
    loadComponent: () =>
      import('../../patient/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'nurse-dashboard',
    loadComponent: () =>
      import('./nurse-dashboard/nurse-dashboard.component').then(
        (m) => m.NurseDashboardComponent
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
