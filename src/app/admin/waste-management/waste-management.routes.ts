import { Route } from '@angular/router';

export const WASTE_MANAGEMENT_ROUTE: Route[] = [
  {
    path: 'waste-tracking',
    loadComponent: () =>
      import('./waste-tracking/waste-tracking.component').then(
        (m) => m.WasteTrackingComponent
      ),
  },
  {
    path: 'disposal-logs',
    loadComponent: () =>
      import('./disposal-logs/disposal-logs.component').then(
        (m) => m.DisposalLogsComponent
      ),
  },
];
