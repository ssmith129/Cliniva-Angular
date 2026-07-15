import { Component, OnInit, TemplateRef, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

export interface PurchaseOrder {
  id: number;
  poNo: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  qty: number;
  totalAmount: string;
  status: 'Pending' | 'Approved' | 'Shipped' | 'Completed';
}

@Component({
  selector: 'app-purchase-orders',
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
    MatSelectModule,
    MatDatepickerModule,
    BreadcrumbComponent,
    MasterTableComponent,
  ],
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  @ViewChild('poDialog') poDialog!: TemplateRef<unknown>;

  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'poNo', label: 'PO Number', type: 'text', visible: true },
    { def: 'supplier', label: 'Supplier Name', type: 'text', visible: true },
    { def: 'orderDate', label: 'Order Date', type: 'date', visible: true },
    { def: 'deliveryDate', label: 'Delivery Date', type: 'date', visible: true },
    { def: 'qty', label: 'Quantity', type: 'text', visible: true },
    { def: 'totalAmount', label: 'Total Amount', type: 'text', visible: true },
    {
      def: 'status',
      label: 'Status',
      type: 'status',
      visible: true,
      statusBadgeMap: {
        'Pending': 'badge badge-solid-orange',
        'Approved': 'badge badge-solid-blue',
        'Shipped': 'badge badge-solid-purple',
        'Completed': 'badge badge-solid-green'
      }
    },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true }
  ];

  dataSource = new MatTableDataSource<PurchaseOrder>([]);
  isLoading = false;

  poForm!: FormGroup;
  dialogTitle = 'Create Purchase Order';
  currentAction: 'add' | 'edit' = 'add';
  selectedPoId?: number;

  // Stats signals/properties
  totalOrders = 5;
  pendingApproval = 2;
  shipped = 1;
  completed = 2;

  suppliersList = [
    'Global Pharma Co.',
    'MedTech Solutions',
    'Lifeline Supplies',
    'Apex Medicals',
    'BioGen Diagnostics'
  ];

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  loadData() {
    const mockData: PurchaseOrder[] = [
      {
        id: 1,
        poNo: 'PO-2026-001',
        supplier: 'Global Pharma Co.',
        orderDate: '2026-06-01',
        deliveryDate: '2026-06-15',
        qty: 1200,
        totalAmount: '$12,450.00',
        status: 'Approved'
      },
      {
        id: 2,
        poNo: 'PO-2026-002',
        supplier: 'MedTech Solutions',
        orderDate: '2026-06-03',
        deliveryDate: '2026-06-18',
        qty: 45,
        totalAmount: '$8,900.00',
        status: 'Shipped'
      },
      {
        id: 3,
        poNo: 'PO-2026-003',
        supplier: 'Lifeline Supplies',
        orderDate: '2026-06-05',
        deliveryDate: '2026-06-12',
        qty: 350,
        totalAmount: '$1,250.00',
        status: 'Completed'
      },
      {
        id: 4,
        poNo: 'PO-2026-004',
        supplier: 'Apex Medicals',
        orderDate: '2026-06-08',
        deliveryDate: '2026-06-20',
        qty: 800,
        totalAmount: '$5,600.00',
        status: 'Pending'
      },
      {
        id: 5,
        poNo: 'PO-2026-005',
        supplier: 'BioGen Diagnostics',
        orderDate: '2026-06-09',
        deliveryDate: '2026-06-25',
        qty: 150,
        totalAmount: '$15,200.00',
        status: 'Pending'
      }
    ];
    this.dataSource.data = mockData;
    this.recalculateStats();
  }

  initForm() {
    this.poForm = this.fb.group({
      poNo: ['', Validators.required],
      supplier: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      deliveryDate: ['', Validators.required],
      qty: [null, [Validators.required, Validators.min(1)]],
      totalAmount: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  recalculateStats() {
    const data = this.dataSource.data;
    this.totalOrders = data.length;
    this.pendingApproval = data.filter(po => po.status === 'Pending').length;
    this.shipped = data.filter(po => po.status === 'Shipped').length;
    this.completed = data.filter(po => po.status === 'Completed').length;
  }

  handleAdd() {
    this.currentAction = 'add';
    this.dialogTitle = 'Create Purchase Order';
    this.poForm.reset({
      poNo: `PO-2026-00${this.dataSource.data.length + 1}`,
      orderDate: new Date(),
      status: 'Pending'
    });
    this.dialog.open(this.poDialog, {
      width: '680px',
      autoFocus: false
    });
  }

  handleEdit(row: PurchaseOrder) {
    this.currentAction = 'edit';
    this.selectedPoId = row.id;
    this.dialogTitle = `Edit Purchase Order: ${row.poNo}`;
    this.poForm.patchValue({
      poNo: row.poNo,
      supplier: row.supplier,
      orderDate: new Date(row.orderDate),
      deliveryDate: new Date(row.deliveryDate),
      qty: row.qty,
      totalAmount: row.totalAmount,
      status: row.status
    });
    this.dialog.open(this.poDialog, {
      width: '680px',
      autoFocus: false
    });
  }

  handleDelete(row: PurchaseOrder) {
    if (confirm(`Are you sure you want to delete ${row.poNo}?`)) {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== row.id);
      this.recalculateStats();
      this.showNotification('snackbar-danger', `Deleted Purchase Order ${row.poNo} successfully.`);
    }
  }

  handleRefresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadData();
      this.isLoading = false;
      this.showNotification('snackbar-success', 'Data refreshed successfully.');
    }, 500);
  }

  handleBulkDelete(selectedRows: PurchaseOrder[]) {
    this.dataSource.data = this.dataSource.data.filter(item => !selectedRows.includes(item));
    this.recalculateStats();
    this.showNotification('snackbar-danger', `${selectedRows.length} record(s) deleted successfully.`);
  }

  submit() {
    if (this.poForm.valid) {
      const formVal = this.poForm.value;
      if (this.currentAction === 'add') {
        const newPo: PurchaseOrder = {
          id: this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map(d => d.id)) + 1 : 1,
          poNo: formVal.poNo,
          supplier: formVal.supplier,
          orderDate: this.formatDate(formVal.orderDate),
          deliveryDate: this.formatDate(formVal.deliveryDate),
          qty: formVal.qty,
          totalAmount: formVal.totalAmount.startsWith('$') ? formVal.totalAmount : `$${formVal.totalAmount}`,
          status: formVal.status
        };
        this.dataSource.data = [newPo, ...this.dataSource.data];
        this.showNotification('snackbar-success', 'Purchase Order created successfully.');
      } else {
        this.dataSource.data = this.dataSource.data.map(item => {
          if (item.id === this.selectedPoId) {
            return {
              ...item,
              poNo: formVal.poNo,
              supplier: formVal.supplier,
              orderDate: this.formatDate(formVal.orderDate),
              deliveryDate: this.formatDate(formVal.deliveryDate),
              qty: formVal.qty,
              totalAmount: formVal.totalAmount.startsWith('$') ? formVal.totalAmount : `$${formVal.totalAmount}`,
              status: formVal.status
            };
          }
          return item;
        });
        this.showNotification('black', 'Purchase Order updated successfully.');
      }
      this.recalculateStats();
      this.dialog.closeAll();
    }
  }

  private formatDate(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().substring(0, 10);
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
