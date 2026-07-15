import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { InventoryReportsService } from '../../inventory-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryReport } from '../../inventory-reports.model';
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
  inventoryReport: InventoryReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-reports-form',
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
export class InventoryReportsFormComponent {
  dialogRef = inject<MatDialogRef<InventoryReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  inventoryReportsService = inject(InventoryReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  inventoryReportForm: FormGroup;
  inventoryReport: InventoryReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.inventoryReport ? 
      data.inventoryReport.itemName : 'New Inventory Item';
    this.inventoryReport = this.action === 'edit' && data.inventoryReport ? 
      data.inventoryReport : new InventoryReport({} as InventoryReport);
    this.inventoryReportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.inventoryReport.id],
      itemName: [this.inventoryReport.itemName, [Validators.required]],
      category: [this.inventoryReport.category, [Validators.required]],
      stockLevel: [this.inventoryReport.stockLevel, [Validators.required]],
      unit: [this.inventoryReport.unit, [Validators.required]],
      status: [this.inventoryReport.status, [Validators.required]],
      lastUpdated: [this.inventoryReport.lastUpdated, [Validators.required]],
    });
  }

  submit() {
    if (this.inventoryReportForm.valid) {
      if (this.action === 'edit') {
        this.inventoryReportsService.updateInventoryReport(this.inventoryReportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.inventoryReportsService.addInventoryReport(this.inventoryReportForm.getRawValue()).subscribe({
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
