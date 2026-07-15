import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    imports: [
        BreadcrumbComponent,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class WizardComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  isLinear = false;
  HFormGroup1?: FormGroup;
  HFormGroup2?: FormGroup;
  VFormGroup1?: FormGroup;
  VFormGroup2?: FormGroup;
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.HFormGroup2 = this._formBuilder.group({
      address: ['', Validators.required],
    });

    this.VFormGroup1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.VFormGroup2 = this._formBuilder.group({
      address: ['', Validators.required],
    });
  }
}
