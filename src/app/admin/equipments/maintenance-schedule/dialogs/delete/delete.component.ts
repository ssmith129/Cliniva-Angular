import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MaintenanceScheduleService } from '../../maintenance-schedule.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  maintenance_id: string;
  equipment_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-maintenance-schedule-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ]
})
export class MaintenanceScheduleDeleteComponent {
  dialogRef = inject<MatDialogRef<MaintenanceScheduleDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  maintenanceScheduleService = inject(MaintenanceScheduleService);


  confirmDelete(): void {
    this.maintenanceScheduleService.deleteSchedule(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
