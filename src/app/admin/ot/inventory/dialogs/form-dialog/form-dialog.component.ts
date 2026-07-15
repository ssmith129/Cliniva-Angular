import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { InventoryService } from '../../inventory.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryItem } from '../../inventory.model';
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
  inventoryItem: InventoryItem;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-form',
  template: `
    <div class="addContainer">
      <div class="modalHeader">
        <div class="avatarDetails">
          <div class="modalTitle">{{ dialogTitle }}</div>
        </div>
        <button mat-icon-button mat-dialog-close class="modal-close-button" aria-label="Close dialog" type="button">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div mat-dialog-content>
        <form class="register-form m-4" [formGroup]="inventoryForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Item ID</mat-label>
                <input matInput formControlName="itemId" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>qr_code</mat-icon>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Item Name</mat-label>
                <input matInput formControlName="itemName" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>inventory_2</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Category</mat-label>
                <input matInput formControlName="category" required>
              </mat-form-field>
            </div>
             <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Supplier</mat-label>
                <input matInput formControlName="supplier" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>local_shipping</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Quantity</mat-label>
                <input matInput type="number" formControlName="quantity" required>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Unit</mat-label>
                <input matInput formControlName="unit" required>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Reorder Level</mat-label>
                <input matInput type="number" formControlName="reorderLevel" required>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status" required>
                  <mat-option value="In Stock">In Stock</mat-option>
                  <mat-option value="Low Stock">Low Stock</mat-option>
                  <mat-option value="Out of Stock">Out of Stock</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
               <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Expiry Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="expiryDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes"></textarea>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <div class="example-button-row">
                <button mat-flat-button class="formSubmitBtn" [disabled]="!inventoryForm.valid" type="submit">Save</button>
                <button mat-flat-button mat-dialog-close class="formCancelBtn" tabindex="-1">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
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
    MatDialogClose,
  ],
})
export class InventoryFormComponent {
  dialogRef = inject<MatDialogRef<InventoryFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  inventoryForm: FormGroup;
  inventoryItem: InventoryItem;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.inventoryItem ? 
      data.inventoryItem.itemName : 'New Item';
    this.inventoryItem = this.action === 'edit' && data.inventoryItem ? 
      data.inventoryItem : new InventoryItem({});
    this.inventoryForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.inventoryItem.id],
      itemId: [this.inventoryItem.itemId, [Validators.required]],
      itemName: [this.inventoryItem.itemName, [Validators.required]],
      category: [this.inventoryItem.category, [Validators.required]],
      quantity: [this.inventoryItem.quantity, [Validators.required]],
      unit: [this.inventoryItem.unit, [Validators.required]],
      reorderLevel: [this.inventoryItem.reorderLevel, [Validators.required]],
      supplier: [this.inventoryItem.supplier, [Validators.required]],
      expiryDate: [this.inventoryItem.expiryDate, [Validators.required]],
      status: [this.inventoryItem.status, [Validators.required]],
      notes: [this.inventoryItem.notes],
    });
  }

  submit() {
    if (this.inventoryForm.valid) {
      if (this.action === 'edit') {
        this.inventoryService.updateInventoryItem(this.inventoryForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.inventoryService.addInventoryItem(this.inventoryForm.getRawValue()).subscribe({
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
