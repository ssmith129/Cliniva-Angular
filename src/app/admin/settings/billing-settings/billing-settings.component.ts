import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

interface ServiceCharge {
  id: number;
  serviceName: string;
  amount: number;
}

interface TaxSetting {
  id: number;
  taxPercentage: number;
}

interface DiscountRule {
  id: number;
  discountType: string;
  value: number;
}



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-billing-settings',
  templateUrl: './billing-settings.component.html',
  styleUrls: ['./billing-settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    FeatherIconsComponent
],
})
export class BillingSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  // Forms
  serviceChargeForm: FormGroup;
  taxSettingForm: FormGroup;
  discountRuleForm: FormGroup;
  invoiceSettingForm: FormGroup;

  // Data arrays
  serviceCharges: ServiceCharge[] = [];
  taxSettings: TaxSetting[] = [];
  discountRules: DiscountRule[] = [];

  // Edit modes
  isEditingServiceCharge = false;
  isEditingTaxSetting = false;
  isEditingDiscountRule = false;

  // Selected items for editing
  selectedServiceCharge: ServiceCharge | null = null;
  selectedTaxSetting: TaxSetting | null = null;
  selectedDiscountRule: DiscountRule | null = null;

  discountTypes = ['Percentage', 'Fixed Amount'];
  paymentMethods = [
    { name: 'Cash', enabled: true },
    { name: 'Card', enabled: true },
    { name: 'Online', enabled: true },
  ];

  constructor() {
    this.serviceChargeForm = this.fb.group({
      serviceName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    this.taxSettingForm = this.fb.group({
      taxPercentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.discountRuleForm = this.fb.group({
      discountType: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
    });

    this.invoiceSettingForm = this.fb.group({
      prefix: ['INV'],
      startingNumber: [1001, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    // Mock data for demonstration
    this.serviceCharges = [
      { id: 1, serviceName: 'Consultation Fee', amount: 50 },
      { id: 2, serviceName: 'Lab Test', amount: 75 },
      { id: 3, serviceName: 'X-Ray', amount: 100 },
    ];

    this.taxSettings = [{ id: 1, taxPercentage: 18 }];

    this.discountRules = [
      { id: 1, discountType: 'Percentage', value: 10 },
      { id: 2, discountType: 'Fixed Amount', value: 20 },
    ];

    this.invoiceSettingForm.patchValue({
      prefix: 'INV',
      startingNumber: 1001,
    });
  }

  // Service Charge methods
  addServiceCharge(): void {
    if (this.serviceChargeForm.valid) {
      const newServiceCharge: ServiceCharge = {
        id: this.serviceCharges.length + 1,
        serviceName: this.serviceChargeForm.get('serviceName')?.value,
        amount: this.serviceChargeForm.get('amount')?.value,
      };

      this.serviceCharges.push(newServiceCharge);
      this.serviceChargeForm.reset();
      this.showNotification('Service charge added successfully!');
    }
  }

  editServiceCharge(service: ServiceCharge): void {
    this.selectedServiceCharge = service;
    this.isEditingServiceCharge = true;
    this.serviceChargeForm.patchValue({
      serviceName: service.serviceName,
      amount: service.amount,
    });
  }

  updateServiceCharge(): void {
    if (this.serviceChargeForm.valid && this.selectedServiceCharge) {
      const index = this.serviceCharges.findIndex(
        (s) => s.id === this.selectedServiceCharge!.id
      );
      if (index !== -1) {
        this.serviceCharges[index] = {
          ...this.selectedServiceCharge,
          serviceName: this.serviceChargeForm.get('serviceName')?.value,
          amount: this.serviceChargeForm.get('amount')?.value,
        };
        this.cancelEditServiceCharge();
        this.showNotification('Service charge updated successfully!');
      }
    }
  }

  deleteServiceCharge(id: number): void {
    this.serviceCharges = this.serviceCharges.filter((s) => s.id !== id);
    this.showNotification('Service charge deleted successfully!');
  }

  cancelEditServiceCharge(): void {
    this.isEditingServiceCharge = false;
    this.selectedServiceCharge = null;
    this.serviceChargeForm.reset();
  }

  // Tax Setting methods
  updateTaxSetting(): void {
    if (this.taxSettingForm.valid) {
      // In a real app, we would update the tax setting
      // For now, we'll just show a notification
      this.showNotification('Tax settings updated successfully!');
    }
  }

  // Discount Rule methods
  addDiscountRule(): void {
    if (this.discountRuleForm.valid) {
      const newDiscountRule: DiscountRule = {
        id: this.discountRules.length + 1,
        discountType: this.discountRuleForm.get('discountType')?.value,
        value: this.discountRuleForm.get('value')?.value,
      };

      this.discountRules.push(newDiscountRule);
      this.discountRuleForm.reset();
      this.showNotification('Discount rule added successfully!');
    }
  }

  editDiscountRule(rule: DiscountRule): void {
    this.selectedDiscountRule = rule;
    this.isEditingDiscountRule = true;
    this.discountRuleForm.patchValue({
      discountType: rule.discountType,
      value: rule.value,
    });
  }

  updateDiscountRule(): void {
    if (this.discountRuleForm.valid && this.selectedDiscountRule) {
      const index = this.discountRules.findIndex(
        (r) => r.id === this.selectedDiscountRule!.id
      );
      if (index !== -1) {
        this.discountRules[index] = {
          ...this.selectedDiscountRule,
          discountType: this.discountRuleForm.get('discountType')?.value,
          value: this.discountRuleForm.get('value')?.value,
        };
        this.cancelEditDiscountRule();
        this.showNotification('Discount rule updated successfully!');
      }
    }
  }

  deleteDiscountRule(id: number): void {
    this.discountRules = this.discountRules.filter((r) => r.id !== id);
    this.showNotification('Discount rule deleted successfully!');
  }

  cancelEditDiscountRule(): void {
    this.isEditingDiscountRule = false;
    this.selectedDiscountRule = null;
    this.discountRuleForm.reset();
  }

  // Invoice Setting methods
  updateInvoiceSettings(): void {
    if (this.invoiceSettingForm.valid) {
      // In a real app, we would update the invoice settings
      // For now, we'll just show a notification
      this.showNotification('Invoice settings updated successfully!');
    }
  }

  togglePaymentMethod(_method: { id?: string | number; name: string; enabled: boolean }): void {
    _method.enabled = !_method.enabled;
    this.showNotification(
      `${_method.name} payment method ${
        _method.enabled ? 'enabled' : 'disabled'
      }!`
    );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
