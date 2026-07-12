import { Route } from '@angular/router';

export const EQUIPMENTS_ROUTE: Route[] = [
  {
    path: 'equipment-list',
    loadComponent: () =>
      import('./equipment-list/equipment-list.component').then(
        (m) => m.EquipmentListComponent
      ),
  },
  {
    path: 'maintenance-schedule',
    loadComponent: () =>
      import('./maintenance-schedule/maintenance-schedule.component').then(
        (m) => m.MaintenanceScheduleComponent
      ),
  },
  {
    path: 'breakdown-reporting',
    loadComponent: () =>
      import('./breakdown-reporting/breakdown-reporting.component').then(
        (m) => m.BreakdownReportingComponent
      ),
  },
];
