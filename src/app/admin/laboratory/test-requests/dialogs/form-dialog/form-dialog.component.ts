import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { TestRequestsService } from '../../test-requests.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestRequest } from '../../test-requests.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  id: number;
  action: string;
  testRequest: TestRequest;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-requests-form',
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
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
})
export class TestRequestsFormComponent {
  dialogRef = inject<MatDialogRef<TestRequestsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  testRequestsService = inject(TestRequestsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  testRequestForm: FormGroup;
  testRequest: TestRequest;

  constructor() {
    const data = this.data;
    this.action = data.action;
    // Fix: Check if testRequest exists before accessing its properties
    this.dialogTitle = this.action === 'edit' && data.testRequest ? data.testRequest.requestId : 'New Test Request';
    this.testRequest = this.action === 'edit' && data.testRequest ? data.testRequest : new TestRequest({});
    this.testRequestForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.testRequest.id],
      requestId: [this.testRequest.requestId, [Validators.required]],
      patientName: [this.testRequest.patientName, [Validators.required]],
      doctorName: [this.testRequest.doctorName, [Validators.required]],
      testName: [this.testRequest.testName, [Validators.required]],
      requestDate: [this.testRequest.requestDate, [Validators.required]],
      date: [this.testRequest.date, [Validators.required]],
      status: [this.testRequest.status, [Validators.required]],
      priority: [this.testRequest.priority, [Validators.required]],
      sampleType: [this.testRequest.sampleType, [Validators.required]],
      notes: [this.testRequest.notes],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.testRequestForm.valid) {
      if (this.action === 'edit') {
        this.testRequestsService.updateTestRequest(this.testRequestForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.testRequestsService.addTestRequest(this.testRequestForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}