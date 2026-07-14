import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { UploadDocumentsService } from '../../upload-documents.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDocument } from '../../upload-documents.model';
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
  uploadDocument: UploadDocument;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-upload-documents-form',
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
    MatDialogClose
],
})
export class UploadDocumentsFormComponent {
  dialogRef = inject<MatDialogRef<UploadDocumentsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  uploadDocumentsService = inject(UploadDocumentsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  uploadDocumentForm: FormGroup;
  uploadDocument: UploadDocument;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.uploadDocument ? 
      data.uploadDocument.document_id : 'New Document Upload';
    this.uploadDocument = this.action === 'edit' && data.uploadDocument ? 
      data.uploadDocument : new UploadDocument({});
    this.uploadDocumentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.uploadDocument.id],
      document_id: [this.uploadDocument.document_id, [Validators.required]],
      patient_name: [this.uploadDocument.patient_name, [Validators.required]],
      document_type: [this.uploadDocument.document_type, [Validators.required]],
      document_name: [this.uploadDocument.document_name, [Validators.required]],
      upload_date: [this.uploadDocument.upload_date, [Validators.required]],
      uploaded_by: [this.uploadDocument.uploaded_by, [Validators.required]],
      status: [this.uploadDocument.status, [Validators.required]],
      notes: [this.uploadDocument.notes],
    });
  }

  submit() {
    if (this.uploadDocumentForm.valid) {
      if (this.action === 'edit') {
        this.uploadDocumentsService.updateUploadDocument(this.uploadDocumentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.uploadDocumentsService.addUploadDocument(this.uploadDocumentForm.getRawValue()).subscribe({
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
