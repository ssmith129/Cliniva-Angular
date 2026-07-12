import { Route } from '@angular/router';

export const AMBULANCE_ROUTE: Route[] = [
  {
    path: 'call-list',
    loadComponent: () =>
      import('./ambulance-call-list/ambulance-call-list.component').then(
        (m) => m.AmbulanceCallListComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./ambulance-list/ambulance-list.component').then(
        (m) => m.AmbulanceListComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('app/authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
