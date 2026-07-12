import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { VisitorRegistrationService } from './visitor-registration.service';
import { Visitor } from './visitor-registration.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-visitor-registration',
  templateUrl: './visitor-registration.component.html',
  styleUrls: ['./visitor-registration.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule
],
})
export class VisitorRegistrationComponent {
  private fb = inject(FormBuilder);
  private visitorRegistrationService = inject(VisitorRegistrationService);
  private snackBar = inject(MatSnackBar);

  visitorForm: FormGroup;
  visitor: Visitor;

  constructor() {
    this.visitor = new Visitor({});
    this.visitorForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.visitor.id],
      img: [this.visitor.img],
      visitorName: [this.visitor.visitorName, [Validators.required]],
      visitorPhone: [this.visitor.visitorPhone, [Validators.required]],
      visitorEmail: [this.visitor.visitorEmail, [Validators.required, Validators.email]],
      visitorAddress: [this.visitor.visitorAddress],
      visitorCity: [this.visitor.visitorCity],
      visitorState: [this.visitor.visitorState],
      idProofType: [this.visitor.idProofType, [Validators.required]],
      idProofNumber: [this.visitor.idProofNumber, [Validators.required]],
      vehicleNumber: [this.visitor.vehicleNumber],
      vehicleType: [this.visitor.vehicleType],
      numberOfVisitors: [this.visitor.numberOfVisitors, [Validators.required, Validators.min(1)]],
      remarks: [this.visitor.remarks],
    });
  }

  onSubmit() {
    if (this.visitorForm.valid) {
      this.visitorRegistrationService.addVisitor(this.visitorForm.getRawValue()).subscribe({
        next: (_response) => {
          this.showNotification(
            'snackbar-success',
            'Visitor Registered Successfully...!!!',
            'bottom',
            'center'
          );
          this.resetForm();
        },
        error: (_error) => {
          this.showNotification(
            'snackbar-danger',
            'Error Registering Visitor',
            'bottom',
            'center'
          );
        },
      });
    }
  }

  resetForm() {
    this.visitorForm.reset();
    this.visitorForm.patchValue({
      numberOfVisitors: 1,
      id: this.visitor.getRandomID()
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
