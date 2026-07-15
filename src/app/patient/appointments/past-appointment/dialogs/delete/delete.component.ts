import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PastAppointmentService } from '../../past-appointment.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  doctor: string;
  email: string;
  mobile: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-past-appointment-delete',
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
export class PastAppointmentDeleteComponent {
  dialogRef = inject<MatDialogRef<PastAppointmentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  appointmentService = inject(PastAppointmentService);

  confirmDelete(): void {
    this.appointmentService.deletePastAppointment(this.data.id).subscribe({
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
