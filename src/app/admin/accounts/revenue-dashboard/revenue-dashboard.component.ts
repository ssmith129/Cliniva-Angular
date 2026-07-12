import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexLegend, ApexFill, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-revenue-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgApexchartsModule,
  ],
  templateUrl: './revenue-dashboard.component.html',
  styleUrls: ['./revenue-dashboard.component.scss'],
})
export class RevenueDashboardComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'OPD Income',
          data: [44, 55, 41, 67, 22, 43, 21, 49, 56, 27, 43, 56],
        },
        {
          name: 'IPD Income',
          data: [13, 23, 20, 8, 13, 27, 33, 12, 11, 29, 32, 14],
        },
        {
          name: 'Pharmacy Sales',
          data: [11, 17, 15, 15, 21, 14, 15, 13, 25, 34, 12, 22],
        },
      ],
      chart: {
        type: 'bar',
        height: 380,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: 'Revenue (Thousands USD)',
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$' + val + 'K';
          },
        },
      },
    };
  }
}
