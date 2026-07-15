import { Component, OnInit, TemplateRef, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface InventoryCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
  totalValuation: string;
  subcategories: string[];
}

@Component({
  selector: 'app-category-management',
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
    MatTableModule,
    MatTooltipModule,
    BreadcrumbComponent,
  ],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  @ViewChild('categoryDialog') categoryDialog!: TemplateRef<unknown>;

  categories: InventoryCategory[] = [];
  displayedColumns: string[] = ['name', 'description', 'subcategories', 'itemCount', 'totalValuation', 'actions'];
  dataSource = new MatTableDataSource<InventoryCategory>([]);

  categoryForm!: FormGroup;
  dialogTitle = 'Add Inventory Category';

  ngOnInit() {
    this.loadCategories();
    this.initForm();
  }

  loadCategories() {
    this.categories = [
      {
        id: 1,
        name: 'Pharmaceuticals',
        icon: 'medication',
        description: 'Antibiotics, painkillers, vaccinations, and other prescription medications.',
        itemCount: 450,
        totalValuation: '$82,450.00',
        subcategories: ['Antibiotics', 'Vaccines', 'Analgesics', 'Anesthetics']
      },
      {
        id: 2,
        name: 'Surgical Supplies',
        icon: 'content_cut',
        description: 'Scalpels, sutures, clamps, retractors, surgical drapes, and sterile packs.',
        itemCount: 180,
        totalValuation: '$41,200.00',
        subcategories: ['Sutures', 'Blades', 'Forceps', 'Syringes']
      },
      {
        id: 3,
        name: 'PPE (Personal Protective Equipment)',
        icon: 'masks',
        description: 'N95 masks, surgical gloves, isolation gowns, face shields, and caps.',
        itemCount: 1200,
        totalValuation: '$12,350.00',
        subcategories: ['Masks', 'Gloves', 'Gowns', 'Face Shields']
      },
      {
        id: 4,
        name: 'Lab Reagents',
        icon: 'biotech',
        description: 'Chemicals, blood gas kits, test tubes, micro-slides, and diagnostic reagents.',
        itemCount: 320,
        totalValuation: '$31,850.00',
        subcategories: ['Reagents', 'Kits', 'Microscopy', 'Culture Media']
      },
      {
        id: 5,
        name: 'IV Fluids',
        icon: 'water_drop',
        description: 'Normal saline, Ringer lactate, dextrose, and intravenous infusion kits.',
        itemCount: 650,
        totalValuation: '$16,400.00',
        subcategories: ['Saline', 'Dextrose', 'Infusion Sets']
      }
    ];

    this.dataSource.data = this.categories;
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      subcategoriesStr: ['', Validators.required],
      itemCount: [0, [Validators.required, Validators.min(0)]],
      totalValuation: ['', Validators.required]
    });
  }

  handleAdd() {
    this.categoryForm.reset({
      itemCount: 0
    });
    this.dialog.open(this.categoryDialog, {
      width: '500px',
      autoFocus: false
    });
  }

  handleDelete(row: InventoryCategory) {
    if (confirm(`Are you sure you want to delete category "${row.name}"?`)) {
      this.categories = this.categories.filter(c => c.id !== row.id);
      this.dataSource.data = this.categories;
      this.showNotification('snackbar-danger', `Deleted category "${row.name}" successfully.`);
    }
  }

  submit() {
    if (this.categoryForm.valid) {
      const val = this.categoryForm.value;
      const parsedSubs = val.subcategoriesStr
        ? val.subcategoriesStr.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

      const newCategory: InventoryCategory = {
        id: this.categories.length > 0 ? Math.max(...this.categories.map(c => c.id)) + 1 : 1,
        name: val.name,
        icon: 'folder_open',
        description: val.description,
        itemCount: val.itemCount,
        totalValuation: val.totalValuation.startsWith('$') ? val.totalValuation : `$${val.totalValuation}`,
        subcategories: parsedSubs
      };

      this.categories = [...this.categories, newCategory];
      this.dataSource.data = this.categories;
      this.showNotification('snackbar-success', 'New Category added successfully.');
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
}
