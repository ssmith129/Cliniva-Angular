import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { ContactsService } from '../contacts.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Contacts } from '../contacts.model';
import { DatePipe, formatDate } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  action: string;
  contacts: Contacts;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-contact-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogClose,
        MatCardModule,
        DatePipe,
    ]
})
export class ContactFormComponent {
  dialogRef = inject<MatDialogRef<ContactFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  contactsService = inject(ContactsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle?: string;
  isDetails = false;
  contactsForm?: FormGroup;
  contacts: Contacts;

  constructor() {
    const data = this.data;

    // Set the defaults
    this.action = data.action;

    // Edit mode
    if (this.action === 'edit') {
      this.dialogTitle = `Edit Contact: ${data.contacts.name}`;
      this.contacts = data.contacts;
      this.contactsForm = this.createContactForm();
      this.isDetails = false;
    }
    // Details mode
    else if (this.action === 'details') {
      this.contacts = data.contacts;
      this.dialogTitle = data.contacts.name;
      this.isDetails = true;
    }
    // New contact mode
    else {
      this.dialogTitle = 'New Contact';
      this.contacts = new Contacts({} as Contacts);
      this.contactsForm = this.createContactForm();
      this.isDetails = false;
    }
  }

  // Validation for the form
  formControl = new FormControl('', [Validators.required]);

  // Error message handling
  getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return 'This field is required';
    }
    if (this.formControl.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  // Form structure and validation rules
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.contacts.id],
      img: [this.contacts.img],
      name: [this.contacts.name, Validators.required],
      email: [
        this.contacts.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      birthDate: [
        formatDate(this.contacts.birthDate, 'yyyy-MM-dd', 'en'),
        Validators.required,
      ],
      address: [this.contacts.address],
      mobile: [
        this.contacts.mobile,
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
      note: [this.contacts.note],
    });
  }

  // Submit logic
  submit(): void {
    if (this.contactsForm?.valid) {
      const contactData = this.contactsForm.getRawValue();
      if (this.action === 'edit') {
        this.contactsService.updateContact(contactData).subscribe({
          next: (response) => this.dialogRef.close(response),
          error: (_error) => { },
        });
      } else {
        this.contactsService.addContact(contactData).subscribe({
          next: (response) => this.dialogRef.close(response),
          error: (_error) => { },
        });
      }
    }
  }

  // Close dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Confirm add or update
  confirmAdd(): void {
    this.submit();
  }
}
