import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { SampleCollectionService } from '../../sample-collection.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleCollection } from '../../sample-collection.model';
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
  sampleCollection: SampleCollection;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sample-collection-form',
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
export class SampleCollectionFormComponent {
  dialogRef = inject<MatDialogRef<SampleCollectionFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  sampleCollectionService = inject(SampleCollectionService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  sampleCollectionForm: FormGroup;
  sampleCollection: SampleCollection;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' ? data.sampleCollection.sampleId : 'New Sample';
    this.sampleCollection = this.action === 'edit' ? data.sampleCollection : new SampleCollection({});
    this.sampleCollectionForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.sampleCollection.id],
      sampleId: [this.sampleCollection.sampleId, [Validators.required]],
      patientName: [this.sampleCollection.patientName, [Validators.required]],
      testName: [this.sampleCollection.testName, [Validators.required]],
      sampleType: [this.sampleCollection.sampleType, [Validators.required]],
      collectionDate: [this.sampleCollection.collectionDate, [Validators.required]],
      collectedBy: [this.sampleCollection.collectedBy, [Validators.required]],
      status: [this.sampleCollection.status, [Validators.required]],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.sampleCollectionForm.valid) {
      if (this.action === 'edit') {
        this.sampleCollectionService.updateSampleCollection(this.sampleCollectionForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.sampleCollectionService.addSampleCollection(this.sampleCollectionForm.getRawValue()).subscribe({
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
