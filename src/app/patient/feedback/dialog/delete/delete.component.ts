import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { Feedback } from '../../feedback.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feedback-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class FeedbackDeleteComponent {
  dialogRef = inject<MatDialogRef<FeedbackDeleteComponent>>(MatDialogRef);
  data = inject<Feedback>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }
}
