import { Route } from '@angular/router';
import { Page404Component } from '../../authentication/page404/page404.component';

export const EMERGENCY_ROUTE: Route[] = [
  {
    path: 'er-dashboard',
    loadComponent: () => import('./er-dashboard/er-dashboard.component').then((m) => m.ErDashboardComponent),
  },
  {
    path: 'triage-queue',
    loadComponent: () => import('./triage-queue/triage-queue.component').then((m) => m.TriageQueueComponent),
  },
  {
    path: 'er-bed-tracker',
    loadComponent: () => import('./er-bed-tracker/er-bed-tracker.component').then((m) => m.ErBedTrackerComponent),
  },
  {
    path: 'patient-triage-form',
    loadComponent: () => import('./patient-triage-form/patient-triage-form.component').then((m) => m.PatientTriageFormComponent),
  },
  {
    path: 'er-incident-log',
    loadComponent: () => import('./er-incident-log/er-incident-log.component').then((m) => m.ErIncidentLogComponent),
  },
  { path: '**', component: Page404Component },
];
