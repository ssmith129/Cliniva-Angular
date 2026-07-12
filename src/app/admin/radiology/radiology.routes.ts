import { Route } from '@angular/router';

export const RADIOLOGY_ROUTE: Route[] = [
  {
    path: 'test-ordering',
    loadComponent: () =>
      import('./test-ordering/test-ordering.component').then(
        (m) => m.TestOrderingComponent
      ),
  },
  {
    path: 'scans-tracking',
    loadComponent: () =>
      import('./scans-tracking/scans-tracking.component').then(
        (m) => m.ScansTrackingComponent
      ),
  },
  {
    path: 'imaging-reports',
    loadComponent: () =>
      import('./imaging-reports/imaging-reports.component').then(
        (m) => m.ImagingReportsComponent
      ),
  },
];
