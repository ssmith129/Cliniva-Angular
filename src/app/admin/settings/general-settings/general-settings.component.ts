import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
],
})
export class GeneralSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  generalForm: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  timeZones = [
    { value: 'UTC', viewValue: 'UTC' },
    { value: 'GMT', viewValue: 'GMT' },
    { value: 'EST', viewValue: 'Eastern Standard Time' },
    { value: 'PST', viewValue: 'Pacific Standard Time' },
    { value: 'IST', viewValue: 'Indian Standard Time' },
  ];

  dateFormats = [
    { value: 'MM/dd/yyyy', viewValue: 'MM/DD/YYYY' },
    { value: 'dd/MM/yyyy', viewValue: 'DD/MM/YYYY' },
    { value: 'yyyy-MM-dd', viewValue: 'YYYY-MM-DD' },
  ];

  currencies = [
    { value: 'USD', viewValue: 'US Dollar ($)' },
    { value: 'EUR', viewValue: 'Euro (â‚¬)' },
    { value: 'GBP', viewValue: 'British Pound (Â£)' },
    { value: 'INR', viewValue: 'Indian Rupee (â‚¹)' },
  ];

  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'fr', viewValue: 'French' },
    { value: 'de', viewValue: 'German' },
  ];

  constructor() {
    this.generalForm = this.fb.group({
      hospitalName: ['', Validators.required],
      hospitalLogo: [''],
      address: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      timeZone: [''],
      dateFormat: [''],
      currency: [''],
      language: [''],
      themeMode: [false],
    });
  }

  ngOnInit(): void {
    // Load existing settings if available
    this.loadSettings();
  }

  loadSettings(): void {
    // Mock data for demonstration
    this.generalForm.patchValue({
      hospitalName: 'Clinic Hospital',
      address: '123 Medical Street, Health City',
      phoneNumber: '+1 234 567 8900',
      email: 'info@clinichospital.com',
      timeZone: 'EST',
      dateFormat: 'MM/dd/yyyy',
      currency: 'USD',
      language: 'en',
      themeMode: false,
    });
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result;
      this.generalForm.patchValue({ hospitalLogo: file });
    };
    reader.readAsDataURL(file);
  }

  removeLogo(event: Event): void {
    event.stopPropagation();
    this.logoPreview = null;
    this.generalForm.patchValue({ hospitalLogo: '' });
  }

  onSubmit(): void {
    if (this.generalForm.valid) {
      // Save settings logic here
      this.showNotification('Settings saved successfully!');
    } else {
      this.showNotification('Please fill in all required fields.');
    }
  }

  onReset(): void {
    this.loadSettings();
    this.logoPreview = null;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'snackbar-success'
    });
  }
}
