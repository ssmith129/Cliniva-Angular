import { Route } from '@angular/router';

export const VISITOR_MANAGEMENT_ROUTE: Route[] = [
  {
    path: 'visitor-registration',
    loadComponent: () =>
      import('./visitor-registration/visitor-registration.component').then(
        (m) => m.VisitorRegistrationComponent
      ),
  },
  {
    path: 'visit-logs',
    loadComponent: () =>
      import('./visit-logs/visit-logs.component').then(
        (m) => m.VisitLogsComponent
      ),
  },
];
