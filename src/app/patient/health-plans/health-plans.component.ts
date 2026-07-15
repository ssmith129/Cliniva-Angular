import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HealthPlansService } from './health-plans.service';
import { HealthPlan, Subscription } from './health-plans.model';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { HealthPlanFormComponent } from './dialog/form-dialog/form-dialog.component';
import { HealthPlanDeleteComponent } from './dialog/delete/delete.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-plans',
  templateUrl: './health-plans.component.html',
  styleUrls: ['./health-plans.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class HealthPlansComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  plansService = inject(HealthPlansService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'planId', label: 'Plan ID', type: 'text', visible: true },
    { def: 'name', label: 'Plan Name', type: 'text', visible: true },
    { def: 'type', label: 'Type', type: 'text', visible: true },
    { def: 'price', label: 'Price', type: 'text', visible: true },
    { def: 'duration', label: 'Duration', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Active: 'badge-solid-green',
        Inactive: 'badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<HealthPlan>([]);
  subscription: Subscription | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadData();
    this.loadSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSubscription() {
    this.plansService.getActiveSubscription()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sub) => (this.subscription = sub));
  }

  loadData() {
    this.isLoading = true;
    this.plansService.getAllHealthPlans()
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

  handleEdit(row: HealthPlan) {
    this.openDialog('edit', row);
  }

  handleDelete(row: HealthPlan) {
    const dialogRef = this.dialog.open(HealthPlanDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.plansService.deleteHealthPlan(row.id);
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

  handleBulkDelete(selectedRows: HealthPlan[]) {
    selectedRows.forEach(row => this.plansService.deleteHealthPlan(row.id));
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: HealthPlan) {
    const dialogRef = this.dialog.open(HealthPlanFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { plan: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.plansService.addHealthPlan(result);
        } else {
          this.plansService.updateHealthPlan(result);
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
}
