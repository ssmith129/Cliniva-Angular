import { Route } from '@angular/router';

export const LABORATORY_ROUTE: Route[] = [
  {
    path: 'test-catalog',
    loadComponent: () =>
      import('./test-catalog/test-catalog.component').then(
        (m) => m.TestCatalogComponent
      ),
  },
  {
    path: 'test-requests',
    loadComponent: () =>
      import('./test-requests/test-requests.component').then(
        (m) => m.TestRequestsComponent
      ),
  },
  {
    path: 'sample-collection',
    loadComponent: () =>
      import('./sample-collection/sample-collection.component').then(
        (m) => m.SampleCollectionComponent
      ),
  },
  {
    path: 'technician-assignment',
    loadComponent: () =>
      import('./technician-assignment/technician-assignment.component').then(
        (m) => m.TechnicianAssignmentComponent
      ),
  },
  {
    path: 'result-entry',
    loadComponent: () =>
      import('./result-entry/result-entry.component').then(
        (m) => m.ResultEntryComponent
      ),
  },
  {
    path: 'lab-reports',
    loadComponent: () =>
      import('./lab-reports/lab-reports.component').then(
        (m) => m.LabReportsComponent
      ),
  },
];
