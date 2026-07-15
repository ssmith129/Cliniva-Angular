import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const INVENTORY_ROUTE: Route[] = [
  {
    path: 'item-stock-list',
    loadComponent: () =>
      import('./item-stock-list/item-stock-list.component').then(
        (m) => m.ItemStockListComponent
      ),
  },
  {
    path: 'issued-items',
    loadComponent: () =>
      import('./issued-items/issued-items.component').then(
        (m) => m.IssuedItemsComponent
      ),
  },
  {
    path: 'purchase-orders',
    loadComponent: () =>
      import('./purchase-orders/purchase-orders.component').then(
        (m) => m.PurchaseOrdersComponent
      ),
  },
  {
    path: 'supplier-list',
    loadComponent: () =>
      import('./supplier-list/supplier-list.component').then(
        (m) => m.SupplierListComponent
      ),
  },
  {
    path: 'reorder-alerts',
    loadComponent: () =>
      import('./reorder-alerts/reorder-alerts.component').then(
        (m) => m.ReorderAlertsComponent
      ),
  },
  {
    path: 'inventory-dashboard',
    loadComponent: () =>
      import('./inventory-dashboard/inventory-dashboard.component').then(
        (m) => m.InventoryDashboardComponent
      ),
  },
  {
    path: 'category-management',
    loadComponent: () =>
      import('./category-management/category-management.component').then(
        (m) => m.CategoryManagementComponent
      ),
  },
  { path: '**', component: Page404Component },
];

