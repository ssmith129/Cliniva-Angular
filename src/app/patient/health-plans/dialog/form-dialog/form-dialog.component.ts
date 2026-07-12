import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthPlan } from '../../health-plans.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


export interface DialogData {
  id: number;
  action: string;
  plan: HealthPlan;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-plan-form',
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
    MatDialogClose
],
})
export class HealthPlanFormComponent {
  dialogRef = inject<MatDialogRef<HealthPlanFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  planForm: FormGroup;
  plan: HealthPlan;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.plan.name;
      this.plan = data.plan;
    } else {
      this.dialogTitle = 'New Health Plan';
      const blankObject = {} as HealthPlan;
      this.plan = new HealthPlanClass(blankObject);
    }
    this.planForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.plan.id],
      planId: [this.plan.planId, [Validators.required]],
      name: [this.plan.name, [Validators.required]],
      type: [this.plan.type, [Validators.required]],
      price: [this.plan.price, [Validators.required]],
      duration: [this.plan.duration, [Validators.required]],
      status: [this.plan.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.planForm.valid) {
      this.dialogRef.close(this.planForm.getRawValue());
    }
  }
}

export class HealthPlanClass {
  id: number;
  planId: string;
  name: string;
  type: string;
  price: string;
  duration: string;
  features: string[];
  status: string;

  constructor(plan: HealthPlan) {
    this.id = plan.id || 0;
    this.planId = plan.planId || '';
    this.name = plan.name || '';
    this.type = plan.type || '';
    this.price = plan.price || '';
    this.duration = plan.duration || '';
    this.features = plan.features || [];
    this.status = plan.status || 'Active';
  }
}
