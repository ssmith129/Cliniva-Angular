import { Route } from '@angular/router';

export const REPORTS_ANALYTICS_ROUTE: Route[] = [
  {
    path: 'clinical-reports',
    loadComponent: () =>
      import('./clinical-reports/clinical-reports.component').then(
        (m) => m.ClinicalReportsComponent
      ),
  },
  {
    path: 'financial-reports',
    loadComponent: () =>
      import('./financial-reports/financial-reports.component').then(
        (m) => m.FinancialReportsComponent
      ),
  },
  {
    path: 'inventory-reports',
    loadComponent: () =>
      import('./inventory-reports/inventory-reports.component').then(
        (m) => m.InventoryReportsComponent
      ),
  },
  {
    path: 'hr-reports',
    loadComponent: () =>
      import('./hr-reports/hr-reports.component').then(
        (m) => m.HrReportsComponent
      ),
  },
  {
    path: 'pharmacy-reports',
    loadComponent: () =>
      import('./pharmacy-reports/pharmacy-reports.component').then(
        (m) => m.PharmacyReportsComponent
      ),
  },
  {
    path: 'radiology-reports',
    loadComponent: () =>
      import('./radiology-reports/radiology-reports.component').then(
        (m) => m.RadiologyReportsComponent
      ),
  },
  {
    path: 'lab-reports',
    loadComponent: () =>
      import('./lab-reports/lab-reports.component').then(
        (m) => m.LabReportsComponent
      ),
  },
  {
    path: 'patient-statistics',
    loadComponent: () =>
      import('./patient-statistics/patient-statistics.component').then(
        (m) => m.PatientStatisticsComponent
      ),
  },
  {
    path: 'executive-summary',
    loadComponent: () =>
      import('./executive-summary/executive-summary.component').then(
        (m) => m.ExecutiveSummaryComponent
      ),
  },
];
