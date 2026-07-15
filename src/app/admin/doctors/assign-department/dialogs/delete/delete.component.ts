import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { AssignDepartmentService } from '../../assign-department.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  doctorId: string;
  doctorName: string;
  department: string;
  specialty: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-assign-department-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ]
})
export class AssignDepartmentDeleteComponent {
  dialogRef = inject<MatDialogRef<AssignDepartmentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  assignDepartmentService = inject(AssignDepartmentService);

  confirmDelete(): void {
    this.assignDepartmentService
      .deleteAssignDepartment(this.data.doctorId)
      .subscribe({
        next: (response) => {
          this.dialogRef.close(response); // Close with the response data
          // Handle successful deletion, e.g., refresh the table or show a notification
        },
        error: (_error) => {
          // Handle the error appropriately
        },
      });
  }
}
