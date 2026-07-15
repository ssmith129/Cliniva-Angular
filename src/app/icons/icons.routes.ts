import { Route } from '@angular/router';

export const ICONS_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'material',
    pathMatch: 'full',
  },
  {
    path: 'material',
    loadComponent: () =>
      import('./material/material.component').then((m) => m.MaterialComponent),
  },
  {
    path: 'font-awesome',
    loadComponent: () =>
      import('./font-awesome/font-awesome.component').then(
        (m) => m.FontAwesomeComponent
      ),
  },
];
