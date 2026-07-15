import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicalNote } from './clinical-notes.model';
import { ClinicalNotesService } from './clinical-notes.service';
import { ClinicalNotesFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { ClinicalNotesDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-notes',
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
  templateUrl: './clinical-notes.component.html',
  styleUrl: './clinical-notes.component.scss',
})
export class ClinicalNotesComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private clinicalNotesService = inject(ClinicalNotesService);

  breadscrums = [
    {
      title: 'Clinical Notes',
      items: ['EMR'],
      active: 'Clinical Notes',
    },
  ];

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'doctorName', label: 'Doctor', type: 'text', visible: true },
    { def: 'noteType', label: 'Note Type', type: 'text', visible: true },
    { def: 'noteDate', label: 'Date', type: 'date', visible: true },
    { def: 'content', label: 'Content', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Draft: 'badge badge-solid-orange',
        'Pending Review': 'badge badge-solid-cyan',
        Finalized: 'badge badge-solid-green',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<ClinicalNote>([]);
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.clinicalNotesService.getAllClinicalNotes().subscribe({
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

  handleEdit(row: ClinicalNote) {
    this.openDialog('edit', row);
  }

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: ClinicalNote) {
    const dialogRef = this.dialog.open(ClinicalNotesFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { clinicalNote: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(
            (record) => record.id === result.id
          );
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

  handleDelete(row: ClinicalNote) {
    const dialogRef = this.dialog.open(ClinicalNotesDeleteComponent, {
      width: '400px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.id !== row.id
        );
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: 'top' | 'bottom',
    placementAlign: 'start' | 'center' | 'end'
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}