import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClinicalNote } from '../../clinical-notes.model';
import { ClinicalNotesService } from '../../clinical-notes.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-notes-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class ClinicalNotesDeleteComponent {
  dialogRef = inject<MatDialogRef<ClinicalNotesDeleteComponent>>(MatDialogRef);
  data = inject<ClinicalNote>(MAT_DIALOG_DATA);
  private clinicalNotesService = inject(ClinicalNotesService);


  confirmDelete(): void {
    this.clinicalNotesService.deleteClinicalNote(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
