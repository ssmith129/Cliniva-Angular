import { Route } from '@angular/router';

export const TIMELINE_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'timeline1',
    pathMatch: 'full',
  },
  {
    path: 'timeline1',
    loadComponent: () =>
      import('./timeline1/timeline1.component').then(
        (m) => m.Timeline1Component
      ),
  },
  {
    path: 'timeline2',
    loadComponent: () =>
      import('./timeline2/timeline2.component').then(
        (m) => m.Timeline2Component
      ),
  },
];
