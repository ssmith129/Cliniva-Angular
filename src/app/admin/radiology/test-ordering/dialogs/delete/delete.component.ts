import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { TestOrderingService } from '../../test-ordering.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  orderId: string;
  testName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-ordering-delete',
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
export class TestOrderingDeleteComponent {
  dialogRef = inject<MatDialogRef<TestOrderingDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  testOrderingService = inject(TestOrderingService);


  confirmDelete(): void {
    this.testOrderingService.deleteTestOrder(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
