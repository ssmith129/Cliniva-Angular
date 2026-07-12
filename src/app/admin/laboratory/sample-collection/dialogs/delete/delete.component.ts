import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { SampleCollectionService } from '../../sample-collection.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  sampleId: string;
  patientName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sample-collection-delete',
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
export class SampleCollectionDeleteComponent {
  dialogRef = inject<MatDialogRef<SampleCollectionDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  sampleCollectionService = inject(SampleCollectionService);


  confirmDelete(): void {
    this.sampleCollectionService.deleteSampleCollection(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
