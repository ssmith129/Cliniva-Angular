import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HealthMonitoringService } from './health-monitoring.service';
import { HealthMetric } from './health-monitoring.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { HealthMetricFormComponent } from './dialog/form-dialog/form-dialog.component';
import { HealthMetricDeleteComponent } from './dialog/delete/delete.component';
import { AiService } from '@core/service/ai.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';

interface AiAnalysisResult {
  status: string;
  analysis: string;
  alerts: string[];
  recommendations: string[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-monitoring',
  templateUrl: './health-monitoring.component.html',
  styleUrls: ['./health-monitoring.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [
    BreadcrumbComponent, 
    MasterTableComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgClass
  ],
})
export class HealthMonitoringComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  healthService = inject(HealthMonitoringService);
  private snackBar = inject(MatSnackBar);
  private aiService = inject(AiService);

  isAnalyzing = signal<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aiAnalysisResult = signal<AiAnalysisResult>(null as any);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'date', label: 'Date', type: 'date', visible: true },
    { def: 'time', label: 'Time', type: 'text', visible: true },
    { def: 'type', label: 'Metric Type', type: 'text', visible: true },
    { def: 'value', label: 'Value', type: 'text', visible: true },
    { def: 'unit', label: 'Unit', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Normal: 'badge-solid-green',
        High: 'badge-solid-red',
        Low: 'badge-solid-orange',
      },
    },
    { def: 'notes', label: 'Notes', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<HealthMetric>([]);
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.healthService
      .getAllHealthMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error: (_err) => {
          this.isLoading = false;
        },
      });
  }

  handleAdd() {
    this.openDialog('add');
  }

  handleEdit(row: HealthMetric) {
    this.openDialog('edit', row);
  }

  handleDelete(row: HealthMetric) {
    const dialogRef = this.dialog.open(HealthMetricDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.healthService.deleteHealthMetric(row.id);
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: HealthMetric[]) {
    selectedRows.forEach((row) =>
      this.healthService.deleteHealthMetric(row.id)
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: HealthMetric) {
    const dialogRef = this.dialog.open(HealthMetricFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { metric: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.healthService.addHealthMetric(result);
        } else {
          this.healthService.updateHealthMetric(result);
        }
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  runVitalsAnalysis() {
    const metrics = this.dataSource.data;
    if (metrics.length === 0) {
      this.snackBar.open('No vital metrics logged yet. Please add some vitals first.', 'Close', { duration: 3000 });
      return;
    }

    this.isAnalyzing.set(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.aiAnalysisResult.set(null as any);

    const vitalsStr = metrics.map(m => `- Date: ${m.date}, Time: ${m.time}, Metric: ${m.type}, Value: ${m.value} ${m.unit}, Status: ${m.status}, Notes: ${m.notes}`).join('\n');

    const prompt = `Act as an expert clinic vital signs AI analyzer. Analyze these patient vitals and logs:
    ${vitalsStr}
    
    Check for:
    1. Critical spikes, drops, or anomaly trends (e.g. blood pressure, heart rate, blood glucose).
    2. Recommendations or simple clinical actions.
    
    Return ONLY valid JSON format. The response should be a JSON object:
    {
      "status": "critical" | "warning" | "stable",
      "analysis": "A concise summary of vitals status and any noted concern.",
      "alerts": [
        "Alert title/message 1",
        "Alert title/message 2"
      ],
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ]
    }
    
    Do not wrap in markdown wrap codes.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isAnalyzing.set(false);
        try {
          if (res.includes('[DEMO MODE]')) {
            const hasHigh = metrics.some(m => m.status === 'High');
            const hasLow = metrics.some(m => m.status === 'Low');
            
            if (hasHigh || hasLow) {
              this.aiAnalysisResult.set({
                status: 'warning',
                analysis: 'AI detected vital metrics that fall outside of the standard optimal physiological ranges (High/Low status flagged in logs).',
                alerts: [
                  'Elevated blood pressure or glucose readings detected in recent checks.',
                  'Inconsistent trend patterns observed; monitoring is recommended.'
                ],
                recommendations: [
                  'Log your vital signs at least twice daily at regular intervals.',
                  'Stay hydrated, restrict sodium/sugar intake, and rest for 10 minutes before measuring.',
                  'Schedule a consultation review if vitals remain outside normal range for more than 48 hours.'
                ]
              });
            } else {
              this.aiAnalysisResult.set({
                status: 'stable',
                analysis: 'All recent vital signs and clinical health metrics are within the normal baseline ranges.',
                alerts: [],
                recommendations: [
                  'Continue tracking your health parameters regularly.',
                  'Maintain your current diet, physical therapy, and hydration habits.',
                  'Next routine checkup is suggested in 3 months.'
                ]
              });
            }
            this.snackBar.open('Vitals Analysis completed (Demo Mode)!', 'Close', { duration: 3000 });
            return;
          }

          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          this.aiAnalysisResult.set(parsed);
          this.snackBar.open('AI Vitals Analysis completed!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.aiAnalysisResult.set({
            status: 'warning',
            analysis: 'Vitals scan completed, but analysis results could not be structured. Please check your logs manually.',
            alerts: [],
            recommendations: ['Check logs manually', 'Log your parameters daily']
          });
        }
      },
      error: () => {
        this.isAnalyzing.set(false);
        this.snackBar.open('Vitals analysis failed. Check AI configuration.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }
}
