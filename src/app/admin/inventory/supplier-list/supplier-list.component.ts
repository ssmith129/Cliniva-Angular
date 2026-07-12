import { Component, OnInit, TemplateRef, ViewChild, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  rating: number; // 1 to 5 stars
  avatarIcon: string;
}

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatMenuModule,
    BreadcrumbComponent,
  ],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('supplierDialog') supplierDialog!: TemplateRef<unknown>;

  allSuppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchText = '';

  supplierForm!: FormGroup;
  dialogTitle = 'Add New Supplier';
  currentAction: 'add' | 'edit' = 'add';
  selectedSupplierId?: number;

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.allSuppliers = [
      {
        id: 1,
        name: 'Global Pharma Co.',
        contactPerson: 'Sarah Jenkins',
        email: 'sjenkins@globalpharma.com',
        phone: '+1 (555) 019-2834',
        address: '452 Medical Parkway, Chicago, IL',
        categories: ['Pharmaceuticals', 'IV Fluids'],
        rating: 5,
        avatarIcon: 'healing'
      },
      {
        id: 2,
        name: 'MedTech Solutions',
        contactPerson: 'David Miller',
        email: 'dmiller@medtech.com',
        phone: '+1 (555) 014-9821',
        address: '89 Innovation Drive, Boston, MA',
        categories: ['Surgical Instruments', 'Equipment'],
        rating: 4,
        avatarIcon: 'biotech'
      },
      {
        id: 3,
        name: 'Lifeline Supplies',
        contactPerson: 'Robert Chen',
        email: 'r.chen@lifelinesupplies.org',
        phone: '+1 (555) 017-4567',
        address: '12 Logistics Center, Dallas, TX',
        categories: ['PPE', 'Consumables', 'Disposables'],
        rating: 4,
        avatarIcon: 'masks'
      },
      {
        id: 4,
        name: 'Apex Medicals',
        contactPerson: 'Elena Rostova',
        email: 'erostova@apexmed.com',
        phone: '+1 (555) 012-3489',
        address: '777 Crestview Road, San Francisco, CA',
        categories: ['Anesthetics', 'Pharmaceuticals'],
        rating: 5,
        avatarIcon: 'science'
      },
      {
        id: 5,
        name: 'BioGen Diagnostics',
        contactPerson: 'Marcus Vance',
        email: 'mvance@biogen.com',
        phone: '+1 (555) 015-7711',
        address: '104 Lab Science Court, Seattle, WA',
        categories: ['Lab Reagents', 'Diagnostic Kits'],
        rating: 3,
        avatarIcon: 'vaccines'
      }
    ];
    this.filterSuppliers();
  }

  initForm() {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      categoriesStr: ['', Validators.required],
      rating: [4, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  filterSuppliers() {
    if (!this.searchText.trim()) {
      this.filteredSuppliers = [...this.allSuppliers];
    } else {
      const q = this.searchText.toLowerCase();
      this.filteredSuppliers = this.allSuppliers.filter(
        s => s.name.toLowerCase().includes(q) ||
             s.contactPerson.toLowerCase().includes(q) ||
             s.categories.some(c => c.toLowerCase().includes(q))
      );
    }
  }

  handleAdd() {
    this.currentAction = 'add';
    this.dialogTitle = 'Add New Supplier';
    this.supplierForm.reset({
      rating: 4
    });
    this.dialog.open(this.supplierDialog, {
      width: '500px',
      autoFocus: false
    });
  }

  handleEdit(supplier: Supplier) {
    this.currentAction = 'edit';
    this.selectedSupplierId = supplier.id;
    this.dialogTitle = `Edit Supplier: ${supplier.name}`;
    this.supplierForm.patchValue({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      categoriesStr: supplier.categories.join(', '),
      rating: supplier.rating
    });
    this.dialog.open(this.supplierDialog, {
      width: '500px',
      autoFocus: false
    });
  }

  handleDelete(supplier: Supplier) {
    if (confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      this.allSuppliers = this.allSuppliers.filter(item => item.id !== supplier.id);
      this.filterSuppliers();
      this.cdr.markForCheck();
      this.showNotification('snackbar-danger', `Deleted supplier ${supplier.name} successfully.`);
    }
  }

  submit() {
    if (this.supplierForm.valid) {
      const val = this.supplierForm.value;
      const parsedCategories = val.categoriesStr
        ? val.categoriesStr.split(',').map((c: string) => c.trim()).filter(Boolean)
        : [];

      if (this.currentAction === 'add') {
        const newSupplier: Supplier = {
          id: this.allSuppliers.length > 0 ? Math.max(...this.allSuppliers.map(s => s.id)) + 1 : 1,
          name: val.name,
          contactPerson: val.contactPerson,
          email: val.email,
          phone: val.phone,
          address: val.address,
          categories: parsedCategories,
          rating: val.rating,
          avatarIcon: 'business'
        };
        this.allSuppliers = [newSupplier, ...this.allSuppliers];
        this.showNotification('snackbar-success', 'Supplier added successfully.');
      } else {
        this.allSuppliers = this.allSuppliers.map(item => {
          if (item.id === this.selectedSupplierId) {
            return {
              ...item,
              name: val.name,
              contactPerson: val.contactPerson,
              email: val.email,
              phone: val.phone,
              address: val.address,
              categories: parsedCategories,
              rating: val.rating
            };
          }
          return item;
        });
        this.showNotification('black', 'Supplier details updated successfully.');
      }
      this.filterSuppliers();
      this.cdr.markForCheck();
      this.dialog.closeAll();
    }
  }

  showNotification(colorName: string, text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: colorName
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
