import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AiService, AiConfig } from '@core/service/ai.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-ai-settings',
  templateUrl: './ai-settings.component.html',
  styleUrls: ['./ai-settings.component.scss'],
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
    MatAutocompleteModule,
    MatSnackBarModule
  ],
})
export class PatientAiSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private aiService = inject(AiService);
  private destroyRef = inject(DestroyRef);

  aiForm: FormGroup;
  isTesting = false;

  providers = [
    { value: 'none', viewValue: 'None (Demo Mode)' },
    { value: 'openai', viewValue: 'OpenAI (GPT-4 / GPT-3.5)' },
    { value: 'gemini', viewValue: 'Google Gemini' },
  ];

  openaiModels = [
    { value: 'gpt-4o', viewValue: 'GPT-4o (Most Advanced)' },
    { value: 'gpt-4-turbo', viewValue: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', viewValue: 'GPT-3.5 Turbo' },
  ];

  geminiModels = [
    { value: 'gemini-1.5-flash', viewValue: 'Gemini 1.5 Flash' },
    { value: 'gemini-1.5-pro', viewValue: 'Gemini 1.5 Pro' },
    { value: 'gemini-pro', viewValue: 'Gemini 1.0 Pro' },
    { value: 'gemini-flash-latest', viewValue: 'Gemini Flash Latest' },
  ];

  constructor() {
    this.aiForm = this.fb.group({
      provider: ['none', Validators.required],
      apiKey: [''],
      model: [''],
    });
  }

  ngOnInit(): void {
    const config = this.aiService.getConfig();
    this.aiForm.patchValue(config);

    this.aiForm.get('provider')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(provider => {
      const apiKeyControl = this.aiForm.get('apiKey');
      if (provider !== 'none') {
        apiKeyControl?.setValidators([Validators.required]);
      } else {
        apiKeyControl?.clearValidators();
      }
      apiKeyControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.aiForm.valid) {
      this.aiService.saveConfig(this.aiForm.value as AiConfig);
      this.showNotification('AI Configuration saved successfully!');
    } else {
      this.showNotification('Please fill in all required fields.');
    }
  }

  onTestConnection(): void {
    if (!this.aiForm.get('apiKey')?.value && this.aiForm.get('provider')?.value !== 'none') {
      this.showNotification('Please enter an API Key first.');
      return;
    }

    this.isTesting = true;
    const currentConfig = this.aiForm.value as AiConfig;
    this.aiService.saveConfig(currentConfig);

    this.aiService.testConnection().subscribe({
      next: (success) => {
        this.isTesting = false;
        if (success) {
          this.showNotification('Connection Successful! AI is ready.', 'success');
        } else {
          this.showNotification('Connection Failed. Please check your API key.', 'error');
        }
      },
      error: (err) => {
        this.isTesting = false;
        this.showNotification(`Error: ${err.message}`, 'error');
      }
    });
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'error' ? 'snackbar-danger' : (type === 'success' ? 'snackbar-success' : 'snackbar-info')
    });
  }
}
