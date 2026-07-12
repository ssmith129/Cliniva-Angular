import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ConsentTemplatesService } from '../../consent-templates.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsentTemplate } from '../../consent-templates.model';
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
  consentTemplate: ConsentTemplate;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consent-templates-form',
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
export class ConsentTemplatesFormComponent {
  dialogRef = inject<MatDialogRef<ConsentTemplatesFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  consentTemplatesService = inject(ConsentTemplatesService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  consentTemplateForm: FormGroup;
  consentTemplate: ConsentTemplate;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.consentTemplate ? 
      data.consentTemplate.template_id : 'New Consent Template';
    this.consentTemplate = this.action === 'edit' && data.consentTemplate ? 
      data.consentTemplate : new ConsentTemplate({});
    this.consentTemplateForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.consentTemplate.id],
      template_id: [this.consentTemplate.template_id, [Validators.required]],
      template_name: [this.consentTemplate.template_name, [Validators.required]],
      category: [this.consentTemplate.category, [Validators.required]],
      department: [this.consentTemplate.department, [Validators.required]],
      version: [this.consentTemplate.version, [Validators.required]],
      created_date: [this.consentTemplate.created_date, [Validators.required]],
      created_by: [this.consentTemplate.created_by, [Validators.required]],
      status: [this.consentTemplate.status, [Validators.required]],
      template_content: [this.consentTemplate.template_content, [Validators.required]],
      notes: [this.consentTemplate.notes],
    });
  }

  submit() {
    if (this.consentTemplateForm.valid) {
      if (this.action === 'edit') {
        this.consentTemplatesService.updateConsentTemplate(this.consentTemplateForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.consentTemplatesService.addConsentTemplate(this.consentTemplateForm.getRawValue()).subscribe({
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
