import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { AmbulanceCallListService } from '../../ambulance-call-list.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  patient_name: string;
  gender: string;
  driver_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-ambulance-call-list-delete',
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
export class AmbulanceCallListDeleteComponent {
  dialogRef = inject<MatDialogRef<AmbulanceCallListDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  ambulanceCallListService = inject(AmbulanceCallListService);

  confirmDelete(): void {
    this.ambulanceCallListService
      .deleteAmbulanceCallList(this.data.id)
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
