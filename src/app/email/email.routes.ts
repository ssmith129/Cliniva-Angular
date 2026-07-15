import { Route } from '@angular/router';

export const EMAIL_ROUTE: Route[] = [
  {
    path: 'inbox',
    loadComponent: () =>
      import('./inbox/inbox.component').then((m) => m.InboxComponent),
  },
  {
    path: 'compose',
    loadComponent: () =>
      import('./compose/compose.component').then((m) => m.ComposeComponent),
  },
  {
    path: 'read-mail',
    loadComponent: () =>
      import('./read-mail/read-mail.component').then(
        (m) => m.ReadMailComponent
      ),
  },
];
