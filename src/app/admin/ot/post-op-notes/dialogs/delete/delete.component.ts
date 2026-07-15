import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PostOpNotesService } from '../../post-op-notes.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  noteId: string;
  patientName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-op-notes-delete',
  template: `
    <div class="container">
      <h3 mat-dialog-title>Are you sure?</h3>
      <div mat-dialog-content>
        <ul class="clearfix">
          <li><p><span class="font-weight-bold"> Note ID: </span>{{data.noteId}}</p></li>
          <li><p><span class="font-weight-bold"> Patient: </span>{{data.patientName}}</p></li>
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
export class PostOpNotesDeleteComponent {
  dialogRef = inject<MatDialogRef<PostOpNotesDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  postOpNotesService = inject(PostOpNotesService);


  confirmDelete(): void {
    this.postOpNotesService.deletePostOpNote(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
