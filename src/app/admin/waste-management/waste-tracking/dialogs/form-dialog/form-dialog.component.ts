import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { WasteTrackingService } from '../../waste-tracking.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WasteTracking } from '../../waste-tracking.model';
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
  waste: WasteTracking;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-waste-tracking-form',
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
export class WasteTrackingFormComponent {
  dialogRef = inject<MatDialogRef<WasteTrackingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  wasteTrackingService = inject(WasteTrackingService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  wasteForm: FormGroup;
  waste: WasteTracking;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.waste ? 
      data.waste.waste_id : 'New Waste Record';
    this.waste = this.action === 'edit' && data.waste ? 
      data.waste : new WasteTracking({});
    this.wasteForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.waste.id],
      waste_id: [this.waste.waste_id, [Validators.required]],
      waste_type: [this.waste.waste_type, [Validators.required]],
      category: [this.waste.category, [Validators.required]],
      quantity: [this.waste.quantity, [Validators.required]],
      department: [this.waste.department, [Validators.required]],
      collection_date: [this.waste.collection_date, [Validators.required]],
      collection_time: [this.waste.collection_time],
      collected_by: [this.waste.collected_by, [Validators.required]],
      status: [this.waste.status, [Validators.required]],
      storage_location: [this.waste.storage_location],
      notes: [this.waste.notes],
    });
  }

  submit() {
    if (this.wasteForm.valid) {
      if (this.action === 'edit') {
        this.wasteTrackingService.updateWasteTracking(this.wasteForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.wasteTrackingService.addWasteTracking(this.wasteForm.getRawValue()).subscribe({
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
