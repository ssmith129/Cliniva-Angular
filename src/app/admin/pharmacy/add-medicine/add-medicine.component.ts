import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-medicine',
    templateUrl: './add-medicine.component.html',
    styleUrls: ['./add-medicine.component.scss'],
    imports: [
        BreadcrumbComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatButtonModule,
    ]
})
export class AddMedicineComponent {
  private fb = inject(FormBuilder);

  medicineListForm: FormGroup;
  constructor() {
    this.medicineListForm = this.fb.group({
      m_no: ['', [Validators.required]],
      m_name: ['', [Validators.required]],
      generic_name: [''],
      category: ['', [Validators.required]],
      company: ['', [Validators.required]],
      batch_no: ['', [Validators.required]],
      supplier: [''],
      p_date: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      e_date: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      side_effects: [''],
    });
  }
  onSubmit() {
  }
}
