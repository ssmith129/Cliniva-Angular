import { Route } from '@angular/router';

export const THIRDLEVEL_ROUTE: Route[] = [
  {
    path: 'third1',
    loadComponent: () =>
      import('./third1/third1.component').then((m) => m.Third1Component),
  },
];
