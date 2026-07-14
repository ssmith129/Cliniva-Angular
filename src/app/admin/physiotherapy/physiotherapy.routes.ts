import { Route } from '@angular/router';

export const PHYSIOTHERAPY_ROUTE: Route[] = [
  {
    path: 'session-scheduling',
    loadComponent: () =>
      import('./session-scheduling/session-scheduling.component').then(
        (m) => m.SessionSchedulingComponent
      ),
  },
  {
    path: 'progress-notes',
    loadComponent: () =>
      import('./progress-notes/progress-notes.component').then(
        (m) => m.ProgressNotesComponent
      ),
  },
];
