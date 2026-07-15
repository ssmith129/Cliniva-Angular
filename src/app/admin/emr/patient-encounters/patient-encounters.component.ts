import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PatientEncountersFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PatientEncountersDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { PatientEncountersService } from './patient-encounters.service';
import { PatientEncounter } from './patient-encounters.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-encounters',
  templateUrl: './patient-encounters.component.html',
  styleUrls: ['./patient-encounters.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PatientEncountersComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  patientEncountersService = inject(PatientEncountersService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'encounterId', label: 'Encounter ID', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'nameWithImage', visible: true },
    { def: 'doctorName', label: 'Doctor', type: 'text', visible: true },
    { def: 'encounterDate', label: 'Date', type: 'date', visible: true },
     {
      def: 'encounterType',
      label: 'Type',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        OPD: 'badge badge-solid-blue',
        IPD: 'badge badge-solid-purple',
        Emergency: 'badge badge-solid-red',
      },
    },
    { def: 'department', label: 'Department', type: 'text', visible: true },
     {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Completed: 'badge badge-solid-green',
        Admitted: 'badge badge-solid-orange',
        Transferred: 'badge badge-solid-brown',
        FollowUp: 'badge badge-solid-cyan',
        Critical: 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PatientEncounter>([]);
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
    this.patientEncountersService.getAllPatientEncounters().subscribe({
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

  handleEdit(row: PatientEncounter) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PatientEncounter) {
    const dialogRef = this.dialog.open(PatientEncountersDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: PatientEncounter) {
    const dialogRef = this.dialog.open(PatientEncountersFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { patientEncounter: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex((record) => record.id === result.id);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
          }
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
