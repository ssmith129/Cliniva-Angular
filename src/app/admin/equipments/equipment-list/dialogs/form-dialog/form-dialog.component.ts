import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { EquipmentListService } from '../../equipment-list.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Equipment } from '../../equipment-list.model';
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
  equipment: Equipment;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-equipment-list-form',
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
export class EquipmentListFormComponent {
  dialogRef = inject<MatDialogRef<EquipmentListFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  equipmentListService = inject(EquipmentListService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  equipmentForm: FormGroup;
  equipment: Equipment;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.equipment ? 
      data.equipment.equipment_name : 'New Equipment';
    this.equipment = this.action === 'edit' && data.equipment ? 
      data.equipment : new Equipment({});
    this.equipmentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.equipment.id],
      equipment_id: [this.equipment.equipment_id, [Validators.required]],
      equipment_name: [this.equipment.equipment_name, [Validators.required]],
      category: [this.equipment.category, [Validators.required]],
      department: [this.equipment.department, [Validators.required]],
      manufacturer: [this.equipment.manufacturer, [Validators.required]],
      model_number: [this.equipment.model_number],
      serial_number: [this.equipment.serial_number],
      purchase_date: [this.equipment.purchase_date, [Validators.required]],
      purchase_cost: [this.equipment.purchase_cost],
      warranty_expiry: [this.equipment.warranty_expiry],
      status: [this.equipment.status, [Validators.required]],
      location: [this.equipment.location],
      notes: [this.equipment.notes],
    });
  }

  submit() {
    if (this.equipmentForm.valid) {
      if (this.action === 'edit') {
        this.equipmentListService.updateEquipment(this.equipmentForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.equipmentListService.addEquipment(this.equipmentForm.getRawValue()).subscribe({
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
