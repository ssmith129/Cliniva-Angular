import { Route } from '@angular/router';

export const SECONDLEVEL_ROUTE: Route[] = [
  {
    path: 'second1',
    loadComponent: () =>
      import('./second1/second1.component').then((m) => m.Second1Component),
  },
  {
    path: 'second2',
    loadComponent: () =>
      import('./second2/second2.component').then((m) => m.Second2Component),
  },
];
