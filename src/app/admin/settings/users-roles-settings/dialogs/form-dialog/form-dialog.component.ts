import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { UsersRolesSettingsService } from '../../users-roles-settings.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../../users-roles-settings.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  userRole: UserRole;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users-roles-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogClose
],
})
export class UsersRolesFormComponent {
  dialogRef = inject<MatDialogRef<UsersRolesFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  usersRolesService = inject(UsersRolesSettingsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  userRoleForm: FormGroup;
  userRole: UserRole;
  
  roles = ['Admin', 'Doctor', 'Nurse', 'Receptionist', 'Accountant', 'Pharmacist', 'Lab Technician'];

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.userRole ? 
      data.userRole.name : 'New User';
    this.userRole = this.action === 'edit' && data.userRole ? 
      data.userRole : new UserRole({} as UserRole);
    this.userRoleForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.userRole.id],
      name: [this.userRole.name, [Validators.required]],
      email: [this.userRole.email, [Validators.required, Validators.email]],
      role: [this.userRole.role, [Validators.required]],
      status: [this.userRole.status, [Validators.required]],
    });
  }

  submit() {
    if (this.userRoleForm.valid) {
      if (this.action === 'edit') {
        this.usersRolesService.updateUserRole(this.userRoleForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.usersRolesService.addUserRole(this.userRoleForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
