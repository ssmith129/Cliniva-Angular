import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResultEntryService } from './result-entry.service';
import { ResultEntry } from './result-entry.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-result-entry',
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FileUploadComponent
  ],
})
export class ResultEntryComponent {
  private fb = inject(FormBuilder);
  private resultEntryService = inject(ResultEntryService);
  private snackBar = inject(MatSnackBar);

  resultForm: FormGroup;

  constructor() {
    this.resultForm = this.fb.group({
      testRequestId: ['', [Validators.required]],
      patientName: ['', [Validators.required]],
      testName: ['', [Validators.required]],
      sampleId: ['', [Validators.required]],
      resultValue: ['', [Validators.required]],
      units: ['', [Validators.required]],
      normalRange: [''],
      comments: [''],
      verifiedBy: ['', [Validators.required]],
      reportFile: [''],
    });
  }

  onSubmit() {
    if (this.resultForm.valid) {
      const resultData = new ResultEntry(this.resultForm.value);
      this.resultEntryService.addResultEntry(resultData).subscribe({
        next: (_res) => {
          this.snackBar.open('Result Submitted Successfully!', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: 'snackbar-success',
          });
          this.resultForm.reset();
        },
        error: (_err) => {
          this.snackBar.open('Error submitting result', '', {
            duration: 2000,
            panelClass: 'snackbar-danger',
          });
        }
      });
    }
  }
}
