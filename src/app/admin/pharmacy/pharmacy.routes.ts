import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const PHARMACY_ROUTE: Route[] = [
  {
    path: 'pharmacy-dashboard',
    loadComponent: () =>
      import('./pharmacy-dashboard/pharmacy-dashboard.component').then((m) => m.PharmacyDashboardComponent),
  },
  {
    path: 'medicine-list',
    loadComponent: () =>
      import('./medicine-list/medicine-list.component').then((m) => m.MedicineListComponent),
  },
  {
    path: 'add-medicine',
    loadComponent: () =>
      import('./add-medicine/add-medicine.component').then((m) => m.AddMedicineComponent),
  },
  {
    path: 'prescription-queue',
    loadComponent: () =>
      import('./prescription-queue/prescription-queue.component').then((m) => m.PrescriptionQueueComponent),
  },
  {
    path: 'pharmacy-pos',
    loadComponent: () =>
      import('./pharmacy-pos/pharmacy-pos.component').then((m) => m.PharmacyPosComponent),
  },
  {
    path: 'stock-alerts',
    loadComponent: () =>
      import('./stock-alerts/stock-alerts.component').then((m) => m.StockAlertsComponent),
  },
  {
    path: 'supplier-orders',
    loadComponent: () =>
      import('./supplier-orders/supplier-orders.component').then((m) => m.SupplierOrdersComponent),
  },
  {
    path: 'drug-interaction',
    loadComponent: () =>
      import('./drug-interaction/drug-interaction.component').then((m) => m.DrugInteractionComponent),
  },
  { path: '**', component: Page404Component },
];

