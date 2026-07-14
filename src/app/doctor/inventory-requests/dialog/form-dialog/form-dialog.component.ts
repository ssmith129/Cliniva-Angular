import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  inventoryRequest: InventoryRequest;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-request-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogClose,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
],
})
export class InventoryRequestFormComponent {
  dialogRef = inject<MatDialogRef<InventoryRequestFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  inventoryRequestForm: FormGroup;
  inventoryRequest: InventoryRequest;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.inventoryRequest.requestId;
      this.inventoryRequest = data.inventoryRequest;
    } else {
      this.dialogTitle = 'New Inventory Request';
      const blankObject = {} as InventoryRequest;
      this.inventoryRequest = new InventoryRequest(blankObject);
    }
    this.inventoryRequestForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.inventoryRequest.id],
      requestId: [this.inventoryRequest.requestId, [Validators.required]],
      itemName: [this.inventoryRequest.itemName, [Validators.required]],
      category: [this.inventoryRequest.category, [Validators.required]],
      quantity: [this.inventoryRequest.quantity, [Validators.required]],
      requestDate: [this.inventoryRequest.requestDate, [Validators.required]],
      requestedBy: [this.inventoryRequest.requestedBy, [Validators.required]],
      status: [this.inventoryRequest.status, [Validators.required]],
      priority: [this.inventoryRequest.priority, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.inventoryRequestForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class InventoryRequest {
  id: number;
  requestId: string;
  itemName: string;
  category: string;
  quantity: number;
  requestDate: string;
  requestedBy: string;
  status: string;
  priority: string;

  constructor(inventoryRequest: InventoryRequest) {
    {
      this.id = inventoryRequest.id || this.getRandomId();
      this.requestId = inventoryRequest.requestId || '';
      this.itemName = inventoryRequest.itemName || '';
      this.category = inventoryRequest.category || '';
      this.quantity = inventoryRequest.quantity || 0;
      this.requestDate = inventoryRequest.requestDate || '';
      this.requestedBy = inventoryRequest.requestedBy || '';
      this.status = inventoryRequest.status || 'Pending';
      this.priority = inventoryRequest.priority || 'Normal';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
