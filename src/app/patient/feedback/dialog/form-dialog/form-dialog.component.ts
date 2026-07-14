import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../../feedback.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  feedback: Feedback;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feedback-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogClose
],
})
export class FeedbackFormComponent {
  dialogRef = inject<MatDialogRef<FeedbackFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  feedbackForm: FormGroup;
  feedback: Feedback;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = `Edit Ticket ${data.feedback.ticketId}`;
      this.feedback = data.feedback;
    } else {
      this.dialogTitle = 'New Feedback Ticket';
      const blankObject = {} as Feedback;
      this.feedback = new FeedbackClass(blankObject);
    }
    this.feedbackForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.feedback.id],
      ticketId: [this.feedback.ticketId, [Validators.required]],
      subject: [this.feedback.subject, [Validators.required]],
      category: [this.feedback.category, [Validators.required]],
      rating: [this.feedback.rating],
      status: [this.feedback.status, [Validators.required]],
      date: [this.feedback.date, [Validators.required]],
      description: [this.feedback.description, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.feedbackForm.valid) {
      this.dialogRef.close(this.feedbackForm.getRawValue());
    }
  }
}

export class FeedbackClass {
  id: number;
  ticketId: string;
  subject: string;
  category: string;
  rating: number;
  status: string;
  date: string;
  description: string;

  constructor(feedback: Feedback) {
    this.id = feedback.id || 0;
    this.ticketId = feedback.ticketId || '';
    this.subject = feedback.subject || '';
    this.category = feedback.category || '';
    this.rating = feedback.rating || 0;
    this.status = feedback.status || 'Pending';
    this.date = feedback.date || '';
    this.description = feedback.description || '';
  }
}
