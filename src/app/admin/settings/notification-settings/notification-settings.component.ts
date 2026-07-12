import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

interface NotificationTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    FeatherIconsComponent
],
})
export class NotificationSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  // Forms
  smtpForm: FormGroup;
  smsForm: FormGroup;
  templateForm: FormGroup;

  // Enable toggles
  smtpEnabled = true;
  smsEnabled = true;

  // Data arrays
  notificationTemplates: NotificationTemplate[] = [];

  // Edit modes
  isEditingTemplate = false;

  // Selected items for editing
  selectedTemplate: NotificationTemplate | null = null;

  constructor() {
    this.smtpForm = this.fb.group({
      host: ['', Validators.required],
      port: [
        '',
        [Validators.required, Validators.min(1), Validators.max(65535)],
      ],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.smsForm = this.fb.group({
      providerName: ['', Validators.required],
      apiKey: ['', Validators.required],
      senderId: ['', Validators.required],
    });

    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    // Mock data for demonstration
    this.smtpForm.patchValue({
      host: 'smtp.example.com',
      port: 587,
      username: 'user@example.com',
      password: 'password123',
    });

    this.smsForm.patchValue({
      providerName: 'Twilio',
      apiKey: 'sk-1234567890abcdef',
      senderId: 'CLINIC',
    });

    this.notificationTemplates = [
      {
        id: 1,
        name: 'Appointment Confirmation',
        subject: 'Appointment Confirmation',
        body: 'Dear {{patientName}}, your appointment with {{doctorName}} is confirmed for {{date}} at {{time}}.',
      },
      {
        id: 2,
        name: 'Payment Receipt',
        subject: 'Payment Receipt',
        body: 'Dear {{patientName}}, your payment of {{amount}} has been received. Transaction ID: {{transactionId}}',
      },
    ];
  }

  toggleSmtp(): void {
    this.smtpEnabled = !this.smtpEnabled;
    this.showNotification(`SMTP ${this.smtpEnabled ? 'enabled' : 'disabled'}`);
  }

  toggleSms(): void {
    this.smsEnabled = !this.smsEnabled;
    this.showNotification(
      `SMS Gateway ${this.smsEnabled ? 'enabled' : 'disabled'}`
    );
  }

  updateSmtpSettings(): void {
    if (this.smtpForm.valid) {
      this.showNotification('SMTP settings updated successfully!');
    }
  }

  updateSmsSettings(): void {
    if (this.smsForm.valid) {
      this.showNotification('SMS gateway settings updated successfully!');
    }
  }

  // Template methods
  addTemplate(): void {
    if (this.templateForm.valid) {
      const newTemplate: NotificationTemplate = {
        id: this.notificationTemplates.length + 1,
        name: this.templateForm.get('name')?.value,
        subject: this.templateForm.get('subject')?.value,
        body: this.templateForm.get('body')?.value,
      };

      this.notificationTemplates.push(newTemplate);
      this.templateForm.reset();
      this.showNotification('Notification template added successfully!');
    }
  }

  editTemplate(template: NotificationTemplate): void {
    this.selectedTemplate = template;
    this.isEditingTemplate = true;
    this.templateForm.patchValue({
      name: template.name,
      subject: template.subject,
      body: template.body,
    });
  }

  updateTemplate(): void {
    if (this.templateForm.valid && this.selectedTemplate) {
      const index = this.notificationTemplates.findIndex(
        (t) => t.id === this.selectedTemplate!.id
      );
      if (index !== -1) {
        this.notificationTemplates[index] = {
          ...this.selectedTemplate,
          name: this.templateForm.get('name')?.value,
          subject: this.templateForm.get('subject')?.value,
          body: this.templateForm.get('body')?.value,
        };
        this.cancelEditTemplate();
        this.showNotification('Notification template updated successfully!');
      }
    }
  }

  deleteTemplate(id: number): void {
    this.notificationTemplates = this.notificationTemplates.filter(
      (t) => t.id !== id
    );
    this.showNotification('Notification template deleted successfully!');
  }

  cancelEditTemplate(): void {
    this.isEditingTemplate = false;
    this.selectedTemplate = null;
    this.templateForm.reset();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
