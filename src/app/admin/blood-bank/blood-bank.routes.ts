import { Route } from '@angular/router';

export const BLOOD_BANK_ROUTE: Route[] = [
  {
    path: 'blood-stock',
    loadComponent: () =>
      import('./blood-stock/blood-stock.component').then(
        (m) => m.BloodStockComponent
      ),
  },
  {
    path: 'blood-donor',
    loadComponent: () =>
      import('./blood-donor/blood-donor.component').then(
        (m) => m.BloodDonorComponent
      ),
  },
  {
    path: 'blood-issued',
    loadComponent: () =>
      import('./blood-issued/blood-issued.component').then(
        (m) => m.BloodIssuedComponent
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
