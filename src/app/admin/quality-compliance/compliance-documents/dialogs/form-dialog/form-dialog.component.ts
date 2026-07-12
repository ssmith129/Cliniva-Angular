import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ComplianceDocumentsService } from '../../compliance-documents.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplianceDocument } from '../../compliance-documents.model';
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
  doc: ComplianceDocument;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-compliance-document-form',
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
export class ComplianceDocumentFormComponent {
  dialogRef = inject<MatDialogRef<ComplianceDocumentFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  complianceDocumentsService = inject(ComplianceDocumentsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  docForm: FormGroup;
  doc: ComplianceDocument;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.doc ? 
      data.doc.document_id : 'New Compliance Document';
    this.doc = this.action === 'edit' && data.doc ? 
      data.doc : new ComplianceDocument({});
    this.docForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.doc.id],
      document_id: [this.doc.document_id, [Validators.required]],
      document_name: [this.doc.document_name, [Validators.required]],
      document_type: [this.doc.document_type, [Validators.required]],
      issuing_authority: [this.doc.issuing_authority, [Validators.required]],
      issue_date: [this.doc.issue_date, [Validators.required]],
      expiry_date: [this.doc.expiry_date, [Validators.required]],
      renewal_date: [this.doc.renewal_date],
      document_number: [this.doc.document_number, [Validators.required]],
      status: [this.doc.status, [Validators.required]],
      responsible_person: [this.doc.responsible_person, [Validators.required]],
      department: [this.doc.department],
      file_location: [this.doc.file_location],
      notes: [this.doc.notes],
    });
  }

  submit() {
    if (this.docForm.valid) {
      if (this.action === 'edit') {
        this.complianceDocumentsService.updateComplianceDocument(this.docForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.complianceDocumentsService.addComplianceDocument(this.docForm.getRawValue()).subscribe({
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
