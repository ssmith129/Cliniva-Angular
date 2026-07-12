import { Component, inject , ChangeDetectionStrategy} from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { PatientDocument } from '../../patient-documents.model';
import { PatientDocumentsService } from '../../patient-documents.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-documents-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatOptionModule],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class PatientDocumentsFormComponent {
  dialogRef = inject<MatDialogRef<PatientDocumentsFormComponent>>(MatDialogRef);
  data = inject<{
    patientDocument?: PatientDocument;
    action: 'add' | 'edit';
}>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private patientDocumentsService = inject(PatientDocumentsService);

  action: 'add' | 'edit';
  dialogTitle: string;
  patientDocumentForm: FormGroup;
  patientDocument: PatientDocument;
  docTypeOptions = ['Lab Report', 'X-Ray', 'MRI Scan', 'CT Scan', 'Discharge Summary', 'Prescription', 'Consent Form', 'Blood Test', 'ECG Report', 'Physical Therapy Notes'];
  statusOptions = ['Uploaded', 'Verified', 'Pending'];

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'add' ? 'Add Patient Document' : 'Edit Patient Document';
    this.patientDocument = data.patientDocument || new PatientDocument({});
    this.patientDocumentForm = this.createForm();
    if (this.action === 'edit' && this.patientDocument) {
      this.patientDocumentForm.patchValue(this.patientDocument);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.patientDocument.id],
      docId: [this.patientDocument.docId, [Validators.required]],
      patientName: [this.patientDocument.patientName, [Validators.required]],
      docType: [this.patientDocument.docType, [Validators.required]],
      uploadedBy: [this.patientDocument.uploadedBy, [Validators.required]],
      uploadDate: [this.patientDocument.uploadDate, [Validators.required]],
      fileUrl: [this.patientDocument.fileUrl, [Validators.required]],
      fileSize: [this.patientDocument.fileSize, [Validators.required]],
      status: [this.patientDocument.status, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.patientDocumentForm.valid) {
      const formData = this.patientDocumentForm.getRawValue();
      const patientDocument = new PatientDocument(formData);
      if (this.action === 'add') {
        this.patientDocumentsService.addPatientDocument(patientDocument).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      } else {
        this.patientDocumentsService.updatePatientDocument(patientDocument).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (_err) => { },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
