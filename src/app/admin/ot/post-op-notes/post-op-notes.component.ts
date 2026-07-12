import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PostOpNotesFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { PostOpNotesDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {
  MasterTableComponent,
  ColumnDefinition,
} from '@shared/components/master-table/master-table.component';
import { PostOpNotesService } from './post-op-notes.service';
import { PostOpNote } from './post-op-notes.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-op-notes',
  templateUrl: './post-op-notes.component.html',
  styleUrls: ['./post-op-notes.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class PostOpNotesComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  postOpNotesService = inject(PostOpNotesService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'noteId', label: 'Note ID', type: 'text', visible: true },
    {
      def: 'patientName',
      label: 'Patient Name',
      type: 'nameWithImage',
      visible: true,
    },
    { def: 'surgeryType', label: 'Surgery Type', type: 'text', visible: true },
    { def: 'noteDate', label: 'Date', type: 'date', visible: true },
    { def: 'recordedBy', label: 'Recorded By', type: 'text', visible: true },
    {
      def: 'recoveryStatus',
      label: 'Recovery',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        Excellent: 'badge badge-solid-green',
        Good: 'badge badge-solid-blue',
        Fair: 'badge badge-solid-orange',
        Poor: 'badge badge-solid-red',
      },
    },
    { def: 'painLevel', label: 'Pain Level', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PostOpNote>([]);
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
    this.postOpNotesService.getAllPostOpNotes().subscribe({
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

  handleEdit(row: PostOpNote) {
    this.openDialog('edit', row);
  }

  handleDelete(row: PostOpNote) {
    const dialogRef = this.dialog.open(PostOpNotesDeleteComponent, {
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

  handleRefresh() {
    this.loadData();
  }

  handleBulkDelete(selectedRows: PostOpNote[]) {
    this.dataSource.data = this.dataSource.data.filter(
      (item) => !selectedRows.includes(item)
    );
    this.showNotification(
      'snackbar-danger',
      `${selectedRows.length} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  openDialog(action: 'add' | 'edit', data?: PostOpNote) {
    const dialogRef = this.dialog.open(PostOpNotesFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { postOpNote: data, action },
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
