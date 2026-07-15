import { Route } from '@angular/router';

export const MULTILEVEL_ROUTE: Route[] = [
  {
    path: 'first1',
    loadComponent: () =>
      import('./first1/first1.component').then((m) => m.First1Component),
  },
  {
    path: 'first2',
    loadComponent: () =>
      import('./first2/first2.component').then((m) => m.First2Component),
  },
  {
    path: 'first3',
    loadComponent: () =>
      import('./first3/first3.component').then((m) => m.First3Component),
  },
  {
    path: 'secondlevel',
    loadChildren: () =>
      import('./secondlevel/secondlevel.routes').then(
        (m) => m.SECONDLEVEL_ROUTE
      ),
  },
  {
    path: 'thirdlevel',
    loadChildren: () =>
      import('./thirdlevel/thirdlevel.routes').then((m) => m.THIRDLEVEL_ROUTE),
  },
];
