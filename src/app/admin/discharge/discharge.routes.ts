import { Route } from '@angular/router';

export const DISCHARGE_ROUTE: Route[] = [
  {
    path: 'workflow',
    loadComponent: () =>
      import('./workflow/workflow.component').then(
        (m) => m.DischargeWorkflowComponent
      ),
  },
  {
    path: 'summary-creation',
    loadComponent: () =>
      import('./summary-creation/summary-creation.component').then(
        (m) => m.SummaryCreationComponent
      ),
  },
  {
    path: 'clearance',
    loadComponent: () =>
      import('./clearance/clearance.component').then(
        (m) => m.ClearanceComponent
      ),
  },
];
