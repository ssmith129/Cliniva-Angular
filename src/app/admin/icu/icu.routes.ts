import { Route } from '@angular/router';

export const ICU_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'icu-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'icu-dashboard',
    loadComponent: () =>
      import('./icu-dashboard/icu-dashboard.component').then(
        (m) => m.IcuDashboardComponent
      ),
  },
  {
    path: 'patient-vitals',
    loadComponent: () =>
      import('./patient-vitals/patient-vitals.component').then(
        (m) => m.PatientVitalsComponent
      ),
  },
  {
    path: 'ventilator-log',
    loadComponent: () =>
      import('./ventilator-log/ventilator-log.component').then(
        (m) => m.VentilatorLogComponent
      ),
  },
  {
    path: 'nursing-notes',
    loadComponent: () =>
      import('./nursing-notes/nursing-notes.component').then(
        (m) => m.NursingNotesComponent
      ),
  },
  {
    path: 'icu-bed-management',
    loadComponent: () =>
      import('./icu-bed-management/icu-bed-management.component').then(
        (m) => m.IcuBedManagementComponent
      ),
  },
];
