import { Route } from '@angular/router';

export const TEBLES_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'basic-tables',
    pathMatch: 'full',
  },
  {
    path: 'basic-tables',
    loadComponent: () =>
      import('./basic-table/basic-table.component').then(
        (m) => m.BasicTableComponent
      ),
  },
  {
    path: 'material-tables',
    loadComponent: () =>
      import('./material-table/material-table.component').then(
        (m) => m.MaterialTableComponent
      ),
  },
  {
    path: 'ngx-datatable',
    loadComponent: () =>
      import('./ngx-datatable/ngx-datatable.component').then(
        (m) => m.NgxDatatableComponent
      ),
  },
];
