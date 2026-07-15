import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { WasteTrackingService } from '../../waste-tracking.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  waste_id: string;
  waste_type: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-waste-tracking-delete',
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
export class WasteTrackingDeleteComponent {
  dialogRef = inject<MatDialogRef<WasteTrackingDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  wasteTrackingService = inject(WasteTrackingService);


  confirmDelete(): void {
    this.wasteTrackingService.deleteWasteTracking(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
