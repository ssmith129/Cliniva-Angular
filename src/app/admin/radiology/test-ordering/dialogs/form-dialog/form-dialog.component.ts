import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { TestOrderingService } from '../../test-ordering.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestOrder } from '../../test-ordering.model';
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
  testOrder: TestOrder;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-ordering-form',
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
export class TestOrderingFormComponent {
  dialogRef = inject<MatDialogRef<TestOrderingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  testOrderingService = inject(TestOrderingService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  testOrderForm: FormGroup;
  testOrder: TestOrder;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.testOrder ? 
      data.testOrder.orderId : 'New Test Order';
    this.testOrder = this.action === 'edit' && data.testOrder ? 
      data.testOrder : new TestOrder({});
    this.testOrderForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.testOrder.id],
      orderId: [this.testOrder.orderId, [Validators.required]],
      patientName: [this.testOrder.patientName, [Validators.required]],
      testName: [this.testOrder.testName, [Validators.required]],
      orderingPhysician: [this.testOrder.orderingPhysician, [Validators.required]],
      orderDate: [this.testOrder.orderDate, [Validators.required]],
      status: [this.testOrder.status, [Validators.required]],
      priority: [this.testOrder.priority, [Validators.required]],
      notes: [this.testOrder.notes],
    });
  }

  submit() {
    if (this.testOrderForm.valid) {
      if (this.action === 'edit') {
        this.testOrderingService.updateTestOrder(this.testOrderForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.testOrderingService.addTestOrder(this.testOrderForm.getRawValue()).subscribe({
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
