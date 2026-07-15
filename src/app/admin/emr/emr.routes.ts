import { Route } from '@angular/router';

export const EMR_ROUTE: Route[] = [
  {
    path: 'patient-encounters',
    loadComponent: () =>
      import('./patient-encounters/patient-encounters.component').then(
        (m) => m.PatientEncountersComponent
      ),
  },
  {
    path: 'clinical-notes',
    loadComponent: () =>
      import('./clinical-notes/clinical-notes.component').then(
        (m) => m.ClinicalNotesComponent
      ),
  },
  {
    path: 'treatment-plans',
    loadComponent: () =>
      import('./treatment-plans/treatment-plans.component').then(
        (m) => m.TreatmentPlansComponent
      ),
  },
  {
    path: 'medication-history',
    loadComponent: () =>
      import('./medication-history/medication-history.component').then(
        (m) => m.MedicationHistoryComponent
      ),
  },
  {
    path: 'patient-documents',
    loadComponent: () =>
      import('./patient-documents/patient-documents.component').then(
        (m) => m.PatientDocumentsComponent
      ),
  },
];
