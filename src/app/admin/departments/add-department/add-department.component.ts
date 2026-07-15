import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.scss'],
    imports: [
        BreadcrumbComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
    ]
})
export class AddDepartmentComponent {
  private fb = inject(FormBuilder);

  departForm: FormGroup;
  constructor() {
    this.departForm = this.fb.group({
      d_no: ['', [Validators.required]],
      d_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      d_date: ['', [Validators.required]],
      d_head: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
    });
  }
  onSubmit() {
  }
}
