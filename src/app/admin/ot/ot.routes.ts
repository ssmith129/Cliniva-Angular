import { Route } from '@angular/router';

export const OT_ROUTE: Route[] = [
  {
    path: 'scheduling',
    loadComponent: () =>
      import('./scheduling/scheduling.component').then(
        (m) => m.OTSchedulingComponent
      ),
  },
  {
    path: 'pre-op-assessment',
    loadComponent: () =>
      import('./pre-op-assessment/pre-op-assessment.component').then(
        (m) => m.PreOpAssessmentComponent
      ),
  },
  {
    path: 'post-op-notes',
    loadComponent: () =>
      import('./post-op-notes/post-op-notes.component').then(
        (m) => m.PostOpNotesComponent
      ),
  },
  {
    path: 'surgery-records',
    loadComponent: () =>
      import('./surgery-records/surgery-records.component').then(
        (m) => m.SurgeryRecordsComponent
      ),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
  },
];
