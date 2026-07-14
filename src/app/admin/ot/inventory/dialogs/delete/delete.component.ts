import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { InventoryService } from '../../inventory.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  itemId: string;
  itemName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-delete',
  template: `
    <div class="container">
      <h3 mat-dialog-title>Are you sure?</h3>
      <div mat-dialog-content>
        <ul class="clearfix">
          <li><p><span class="font-weight-bold"> Item ID: </span>{{data.itemId}}</p></li>
          <li><p><span class="font-weight-bold"> Item Name: </span>{{data.itemName}}</p></li>
        </ul>
        <p>This action cannot be undone.</p>
      </div>
      <div mat-dialog-actions class="mb-1">
        <button mat-flat-button class="formCancelBtn" (click)="confirmDelete()">Delete</button>
        <button mat-flat-button mat-dialog-close color="accent" tabindex="-1">Cancel</button>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ]
})
export class InventoryDeleteComponent {
  dialogRef = inject<MatDialogRef<InventoryDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  inventoryService = inject(InventoryService);


  confirmDelete(): void {
    this.inventoryService.deleteInventoryItem(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
