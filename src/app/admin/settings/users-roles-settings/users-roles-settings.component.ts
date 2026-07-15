import { Component, OnDestroy, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { UsersRolesFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { UserRoleDeleteComponent } from './dialogs/delete/delete.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { UsersRolesSettingsService } from './users-roles-settings.service';
import { UserRole } from './users-roles-settings.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users-roles-settings',
  templateUrl: './users-roles-settings.component.html',
  styleUrls: ['./users-roles-settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MasterTableComponent,
  ],
})
export class UsersRolesSettingsComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  usersRolesService = inject(UsersRolesSettingsService);
  private snackBar = inject(MatSnackBar);

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: 'ID', type: 'text', visible: false },
    { def: 'name', label: 'Name', type: 'text', visible: true },
    { def: 'email', label: 'Email', type: 'text', visible: true },
    { def: 'role', label: 'Role', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        'Active': 'badge badge-solid-green',
        'Inactive': 'badge badge-solid-red',
      },
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<UserRole>([]);
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
    this.usersRolesService.getAllUsersRoles().subscribe({
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

  handleEdit(row: UserRole) {
    this.openDialog('edit', row);
  }

  handleDelete(row: UserRole) {
    const dialogRef = this.dialog.open(UserRoleDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((record) => record.id !== row.id);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }

  handleBulkDelete(selectedRows: UserRole[]) {
    this.dataSource.data = this.dataSource.data.filter((item) => !selectedRows.includes(item));
    this.showNotification('snackbar-danger', `${selectedRows.length} Record(s) Deleted Successfully...!!!`, 'bottom', 'center');
  }

  handleRefresh() {
    this.loadData();
  }

  openDialog(action: 'add' | 'edit', data?: UserRole) {
    const dialogRef = this.dialog.open(UsersRolesFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { userRole: data, action },
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
        this.showNotification(action === 'add' ? 'snackbar-success' : 'black', `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`, 'bottom', 'center');
      }
    });
  }

  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
