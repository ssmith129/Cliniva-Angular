import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { DisposalLogsService } from '../../disposal-logs.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisposalLog } from '../../disposal-logs.model';
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
  log: DisposalLog;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-disposal-log-form',
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
export class DisposalLogFormComponent {
  dialogRef = inject<MatDialogRef<DisposalLogFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  disposalLogsService = inject(DisposalLogsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  logForm: FormGroup;
  log: DisposalLog;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.log ?
      data.log.disposal_id : 'New Disposal Log';
    this.log = this.action === 'edit' && data.log ?
      data.log : new DisposalLog({});
    this.logForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.log.id],
      disposal_id: [this.log.disposal_id, [Validators.required]],
      waste_id: [this.log.waste_id, [Validators.required]],
      waste_type: [this.log.waste_type, [Validators.required]],
      quantity: [this.log.quantity, [Validators.required]],
      disposal_date: [this.log.disposal_date, [Validators.required]],
      disposal_time: [this.log.disposal_time],
      disposal_method: [this.log.disposal_method, [Validators.required]],
      vendor_name: [this.log.vendor_name, [Validators.required]],
      vendor_license: [this.log.vendor_license],
      transport_vehicle: [this.log.transport_vehicle],
      authorized_by: [this.log.authorized_by, [Validators.required]],
      compliance_status: [this.log.compliance_status, [Validators.required]],
      certificate_number: [this.log.certificate_number],
      notes: [this.log.notes],
    });
  }

  submit() {
    if (this.logForm.valid) {
      if (this.action === 'edit') {
        this.disposalLogsService.updateDisposalLog(this.logForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.disposalLogsService.addDisposalLog(this.logForm.getRawValue()).subscribe({
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
