import { Route } from '@angular/router';

export const TASK_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./task.component').then((m) => m.TaskComponent),
  },
];
