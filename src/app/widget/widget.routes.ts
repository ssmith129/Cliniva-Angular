import { Route } from '@angular/router';

export const WIDGET_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'chart-widget',
    pathMatch: 'full',
  },
  {
    path: 'chart-widget',
    loadComponent: () =>
      import('./chart-widget/chart-widget.component').then(
        (m) => m.ChartWidgetComponent
      ),
  },
  {
    path: 'data-widget',
    loadComponent: () =>
      import('./data-widget/data-widget.component').then(
        (m) => m.DataWidgetComponent
      ),
  },
];
