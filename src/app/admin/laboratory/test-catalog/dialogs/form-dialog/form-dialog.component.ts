import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { TestCatalogService } from '../../test-catalog.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestCatalog } from '../../test-catalog.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

export interface DialogData {
  id: number;
  action: string;
  testCatalog: TestCatalog;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-catalog-form',
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
    MatDialogClose,
  ],
})
export class TestCatalogFormComponent implements OnInit {
  dialogRef = inject<MatDialogRef<TestCatalogFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  testCatalogService = inject(TestCatalogService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  testCatalogForm: FormGroup;
  testCatalog: TestCatalog;

  constructor() {
    const data = this.data;
    this.action = data.action;
    // Fix: Check if testCatalog exists before accessing its properties
    this.dialogTitle = this.action === 'edit' && data.testCatalog ? data.testCatalog.testName : 'New Test';
    this.testCatalog = this.action === 'edit' && data.testCatalog ? data.testCatalog : new TestCatalog({});
    this.testCatalogForm = this.createContactForm();
  }

  ngOnInit() {
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.testCatalog.id],
      code: [this.testCatalog.code, [Validators.required]],
      testName: [this.testCatalog.testName, [Validators.required]],
      category: [this.testCatalog.category, [Validators.required]],
      department: [this.testCatalog.department, [Validators.required]],
      sampleType: [this.testCatalog.sampleType, [Validators.required]],
      price: [this.testCatalog.price, [Validators.required, Validators.min(0)]],
      duration: [this.testCatalog.duration, [Validators.required]],
      status: [this.testCatalog.status, [Validators.required]],
      description: [this.testCatalog.description],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.testCatalogForm.valid) {
      if (this.action === 'edit') {
        this.testCatalogService.updateTestCatalog(this.testCatalogForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.testCatalogService.addTestCatalog(this.testCatalogForm.getRawValue()).subscribe({
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