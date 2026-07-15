import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { EquipmentListService } from '../../equipment-list.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  equipment_id: string;
  equipment_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-equipment-list-delete',
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
export class EquipmentListDeleteComponent {
  dialogRef = inject<MatDialogRef<EquipmentListDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  equipmentListService = inject(EquipmentListService);


  confirmDelete(): void {
    this.equipmentListService.deleteEquipment(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
