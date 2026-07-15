import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { HealthPlan } from '../../health-plans.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-plan-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class HealthPlanDeleteComponent {
  dialogRef = inject<MatDialogRef<HealthPlanDeleteComponent>>(MatDialogRef);
  data = inject<HealthPlan>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }
}
