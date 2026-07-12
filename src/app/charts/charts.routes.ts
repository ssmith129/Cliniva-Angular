import { Route } from '@angular/router';

export const CHART_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'echart',
    pathMatch: 'full',
  },
  {
    path: 'echart',
    loadComponent: () =>
      import('./echart/echart.component').then((m) => m.EchartComponent),
  },
  {
    path: 'apex',
    loadComponent: () =>
      import('./apexchart/apexchart.component').then(
        (m) => m.ApexchartComponent
      ),
  },
  {
    path: 'chartjs',
    loadComponent: () =>
      import('./chartjs/chartjs.component').then((m) => m.ChartjsComponent),
  },
  {
    path: 'ngx-charts',
    loadComponent: () =>
      import('./ngxchart/ngxchart.component').then((m) => m.NgxchartComponent),
  },
  {
    path: 'gauge',
    loadComponent: () =>
      import('./gauge/gauge.component').then((m) => m.GaugeComponent),
  },
];
