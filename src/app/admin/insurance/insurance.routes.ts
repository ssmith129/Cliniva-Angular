import { Route } from '@angular/router';

export const INSURANCE_ROUTE: Route[] = [
  {
    path: 'patient-insurance',
    loadComponent: () =>
      import('./patient-insurance/patient-insurance.component').then(
        (m) => m.PatientInsuranceComponent
      ),
  },
  {
    path: 'new-claim',
    loadComponent: () =>
      import('./new-claim/new-claim.component').then(
        (m) => m.NewClaimComponent
      ),
  },
  {
    path: 'claim-status',
    loadComponent: () =>
      import('./claim-status/claim-status.component').then(
        (m) => m.ClaimStatusComponent
      ),
  },
  {
    path: 'insurance-provider',
    loadComponent: () =>
      import('./insurance-provider/insurance-provider.component').then(
        (m) => m.InsuranceProviderComponent
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
