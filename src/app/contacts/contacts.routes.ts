import { Route } from '@angular/router';

export const CONTACT_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./contacts.component').then((m) => m.ContactsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('app/authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
