import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { AuditChecklistService } from '../../audit-checklist.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditChecklist } from '../../audit-checklist.model';
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
  audit: AuditChecklist;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-audit-checklist-form',
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
export class AuditChecklistFormComponent {
  dialogRef = inject<MatDialogRef<AuditChecklistFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  auditChecklistService = inject(AuditChecklistService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  auditForm: FormGroup;
  audit: AuditChecklist;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.audit ? 
      data.audit.audit_id : 'New Audit Checklist';
    this.audit = this.action === 'edit' && data.audit ? 
      data.audit : new AuditChecklist({});
    this.auditForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.audit.id],
      audit_id: [this.audit.audit_id, [Validators.required]],
      audit_type: [this.audit.audit_type, [Validators.required]],
      department: [this.audit.department, [Validators.required]],
      audit_date: [this.audit.audit_date, [Validators.required]],
      auditor_name: [this.audit.auditor_name, [Validators.required]],
      auditor_organization: [this.audit.auditor_organization],
      compliance_score: [this.audit.compliance_score],
      total_items: [this.audit.total_items],
      items_passed: [this.audit.items_passed],
      items_failed: [this.audit.items_failed],
      status: [this.audit.status, [Validators.required]],
      findings: [this.audit.findings],
      recommendations: [this.audit.recommendations],
      follow_up_date: [this.audit.follow_up_date],
      notes: [this.audit.notes],
    });
  }

  submit() {
    if (this.auditForm.valid) {
      if (this.action === 'edit') {
        this.auditChecklistService.updateAuditChecklist(this.auditForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.auditChecklistService.addAuditChecklist(this.auditForm.getRawValue()).subscribe({
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
