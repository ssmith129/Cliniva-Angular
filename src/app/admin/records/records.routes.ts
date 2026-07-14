import { Route } from '@angular/router';

export const RECORDS_ROUTE: Route[] = [
  {
    path: 'birth',
    loadComponent: () =>
      import('./birth/birth.component').then((m) => m.BirthComponent),
  },
  {
    path: 'death',
    loadComponent: () =>
      import('./death/death.component').then((m) => m.DeathComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('app/authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
