import { Route } from '@angular/router';

export const PATIENT_ROUTE: Route[] = [
  {
    path: 'all-patients',
    loadComponent: () =>
      import('./allpatients/allpatients.component').then(
        (m) => m.AllpatientsComponent
      ),
  },
  {
    path: 'add-patient',
    loadComponent: () =>
      import('./add-patient/add-patient.component').then(
        (m) => m.AddPatientComponent
      ),
  },
  {
    path: 'edit-patient',
    loadComponent: () =>
      import('./edit-patient/edit-patient.component').then(
        (m) => m.EditPatientComponent
      ),
  },
  {
    path: 'patient-records',
    loadComponent: () =>
      import('./patient-records/patient-records.component').then(
        (m) => m.PatientRecordsComponent
      ),
  },
  {
    path: 'patient-profile',
    loadComponent: () =>
      import('./patient-profile/patient-profile.component').then(
        (m) => m.PatientProfileComponent
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
