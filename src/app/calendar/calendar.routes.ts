import { Route } from '@angular/router';

export const CALENDAR_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./calendar.component').then((m) => m.CalendarComponent),
  },
];
