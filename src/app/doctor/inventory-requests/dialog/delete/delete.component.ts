import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { InventoryRequest } from '../../inventory-requests.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-request-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class InventoryRequestDeleteComponent {
  dialogRef = inject<MatDialogRef<InventoryRequestDeleteComponent>>(MatDialogRef);
  data = inject<InventoryRequest>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }
}
