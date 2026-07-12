import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

export interface PrescriptionDialogData {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  date: string;
  items: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  phone?: string;
  notes?: string;
}

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.scss']
})
export class PrescriptionDetailsComponent {
  parsedItems: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrescriptionDialogData
  ) {
    if (data.items) {
      this.parsedItems = data.items.split(',').map(item => item.trim());
    }
    // Add dummy details for demonstration
    if (!this.data.phone) {
      this.data.phone = '+1 (555) 019-8234';
    }
    if (!this.data.notes) {
      this.data.notes = 'Patient requires generic substitution if possible. Regular checkups scheduled.';
    }
  }

  onFulfill(): void {
    this.dialogRef.close({ action: 'fulfill', data: this.data });
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel', data: this.data });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
