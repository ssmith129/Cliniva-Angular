import { Route } from '@angular/router';

export const DOCTOR_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./appointments/appointments.component').then((m) => m.AppointmentsComponent),
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./doctors/doctors.component').then((m) => m.DoctorsComponent),
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./patients/patients.component').then((m) => m.PatientsComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./billing/billing.component').then((m) => m.BillingComponent),
  },
  {
    path: 'certificates',
    loadComponent: () =>
      import('./certificates/certificates.component').then((m) => m.CertificatesComponent),
  },
  {
    path: 'consultations',
    loadComponent: () =>
      import('./consultations/consultations.component').then((m) => m.ConsultationsComponent),
  },
  {
    path: 'inventory-requests',
    loadComponent: () =>
      import('./inventory-requests/inventory-requests.component').then((m) => m.InventoryRequestsComponent),
  },
  {
    path: 'lab-reports',
    loadComponent: () =>
      import('./lab-reports/lab-reports.component').then((m) => m.LabReportsComponent),
  },
  {
    path: 'patient-records',
    loadComponent: () =>
      import('./patient-records/patient-records.component').then((m) => m.PatientRecordsComponent),
  },
  {
    path: 'prescriptions',
    loadComponent: () =>
      import('./prescriptions/prescriptions.component').then((m) => m.PrescriptionsComponent),
  },
  {
    path: 'referrals',
    loadComponent: () =>
      import('./referrals/referrals.component').then((m) => m.ReferralsComponent),
  },
  {
    path: 'surgeries',
    loadComponent: () =>
      import('./surgeries/surgeries.component').then((m) => m.SurgeriesComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/tasks.component').then((m) => m.TasksComponent),
  },
  {
    path: 'ai-settings',
    loadComponent: () =>
      import('./ai-settings/ai-settings.component').then((m) => m.DoctorAiSettingsComponent),
  },
  {
    path: 'telemedicine',
    loadComponent: () =>
      import('./telemedicine/telemedicine.component').then((m) => m.TelemedicineComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../authentication/page404/page404.component').then((m) => m.Page404Component),
  },
];
