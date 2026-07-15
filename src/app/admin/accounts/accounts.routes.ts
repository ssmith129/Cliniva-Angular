import { Route } from '@angular/router';

export const ACCOUNTS_ROUTE: Route[] = [
  {
    path: 'bill-list',
    loadComponent: () => import('./bill-list/bill-list.component').then((m) => m.BillListComponent),
  },
  {
    path: 'add-bill',
    loadComponent: () => import('./add-bill/add-bill.component').then((m) => m.AddBillComponent),
  },
  {
    path: 'income',
    loadComponent: () => import('./income/income.component').then((m) => m.IncomeComponent),
  },
  {
    path: 'expenses',
    loadComponent: () => import('./expenses/expenses.component').then((m) => m.ExpensesComponent),
  },
  {
    path: 'income-report',
    loadComponent: () => import('./income-report/income-report.component').then((m) => m.IncomeReportComponent),
  },
  {
    path: 'invoice',
    loadComponent: () => import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
  },
  {
    path: 'payment-receipts',
    loadComponent: () => import('./payment-receipts/payment-receipts.component').then((m) => m.PaymentReceiptsComponent),
  },
  {
    path: 'insurance-claims',
    loadComponent: () => import('./insurance-claims/insurance-claims.component').then((m) => m.InsuranceClaimsComponent),
  },
  {
    path: 'revenue-dashboard',
    loadComponent: () => import('./revenue-dashboard/revenue-dashboard.component').then((m) => m.RevenueDashboardComponent),
  },
  {
    path: 'tax-reports',
    loadComponent: () => import('./tax-reports/tax-reports.component').then((m) => m.TaxReportsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('app/authentication/page404/page404.component').then((m) => m.Page404Component),
  },
];
