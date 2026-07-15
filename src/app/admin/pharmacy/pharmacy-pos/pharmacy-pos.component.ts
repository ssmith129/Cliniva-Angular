import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface MedicineCatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface CartItem {
  medicine: MedicineCatalogItem;
  quantity: number;
}

@Component({
  selector: 'app-pharmacy-pos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BreadcrumbComponent,
  ],
  templateUrl: './pharmacy-pos.component.html',
  styleUrls: ['./pharmacy-pos.component.scss'],
})
export class PharmacyPosComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Pharmacy POS',
      items: ['Pharmacy'],
      active: 'POS Counter',
    },
  ];

  catalog = signal<MedicineCatalogItem[]>([
    { id: 'M001', name: 'Paracetamol 500mg', category: 'Analgesics', price: 5.00, stock: 120, image: 'assets/images/user/user1.jpg' },
    { id: 'M002', name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 12.00, stock: 85, image: 'assets/images/user/user2.jpg' },
    { id: 'M003', name: 'Atorvastatin 20mg', category: 'Cardiology', price: 18.50, stock: 43, image: 'assets/images/user/user3.jpg' },
    { id: 'M004', name: 'Lisinopril 10mg', category: 'Cardiology', price: 14.00, stock: 68, image: 'assets/images/user/user4.jpg' },
    { id: 'M005', name: 'Metformin 850mg', category: 'Diabetology', price: 9.00, stock: 160, image: 'assets/images/user/user5.jpg' },
    { id: 'M006', name: 'Ibuprofen 400mg', category: 'Analgesics', price: 6.50, stock: 95, image: 'assets/images/user/user7.jpg' },
    { id: 'M007', name: 'Insulin Glargine', category: 'Diabetology', price: 45.00, stock: 15, image: 'assets/images/user/user8.jpg' },
  ]);

  searchText = signal('');
  selectedCategory = signal('All');
  cart = signal<CartItem[]>([]);

  paymentMethod = 'Cash';
  discountPercent = 0;
  insurancePercent = 0;

  // Receipt Modal control
  isReceiptOpen = false;
  receiptTxId = '';
  receiptDate = '';

  categories = ['All', 'Analgesics', 'Antibiotics', 'Cardiology', 'Diabetology'];

  filteredCatalog = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    const cat = this.selectedCategory();
    return this.catalog().filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search) || item.id.toLowerCase().includes(search);
      const matchesCat = cat === 'All' || item.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  cartSubtotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  });

  cartDiscountAmount = computed(() => {
    return (this.cartSubtotal() * this.discountPercent) / 100;
  });

  cartInsuranceAmount = computed(() => {
    return (this.cartSubtotal() * this.insurancePercent) / 100;
  });

  cartTaxAmount = computed(() => {
    const taxableAmount = this.cartSubtotal() - this.cartDiscountAmount() - this.cartInsuranceAmount();
    return Math.max(0, taxableAmount * 0.05); // 5% tax
  });

  cartTotal = computed(() => {
    const value = this.cartSubtotal() - this.cartDiscountAmount() - this.cartInsuranceAmount() + this.cartTaxAmount();
    return Math.max(0, value);
  });

  ngOnInit() {}

  addToCart(med: MedicineCatalogItem) {
    if (med.stock <= 0) {
      this.showNotification('Item is out of stock.', 'snackbar-danger');
      return;
    }

    const existingIndex = this.cart().findIndex(item => item.medicine.id === med.id);
    if (existingIndex !== -1) {
      const currentQty = this.cart()[existingIndex].quantity;
      if (currentQty >= med.stock) {
        this.showNotification('Cannot exceed available stock limit.', 'snackbar-warning');
        return;
      }
      this.cart.update(items => {
        const copy = [...items];
        copy[existingIndex].quantity++;
        return copy;
      });
    } else {
      this.cart.update(items => [...items, { medicine: med, quantity: 1 }]);
    }
    this.showNotification(`${med.name} added to cart.`, 'snackbar-success');
  }

  updateQuantity(item: CartItem, amount: number) {
    const newQty = item.quantity + amount;
    if (newQty <= 0) {
      this.removeFromCart(item);
      return;
    }
    if (newQty > item.medicine.stock) {
      this.showNotification('Cannot exceed available stock limit.', 'snackbar-warning');
      return;
    }
    this.cart.update(items => items.map(i => i.medicine.id === item.medicine.id ? { ...i, quantity: newQty } : i));
  }

  removeFromCart(item: CartItem) {
    this.cart.update(items => items.filter(i => i.medicine.id !== item.medicine.id));
    this.showNotification(`${item.medicine.name} removed from cart.`, 'black');
  }

  clearCart() {
    this.cart.set([]);
    this.discountPercent = 0;
    this.insurancePercent = 0;
    this.showNotification('Cart cleared.', 'black');
  }

  checkout() {
    if (this.cart().length === 0) {
      this.showNotification('Please add items to the cart first.', 'snackbar-warning');
      return;
    }

    // Deduct stock levels in mock catalog
    this.catalog.update(catalogItems => {
      return catalogItems.map(catalogItem => {
        const cartMatch = this.cart().find(c => c.medicine.id === catalogItem.id);
        if (cartMatch) {
          return { ...catalogItem, stock: Math.max(0, catalogItem.stock - cartMatch.quantity) };
        }
        return catalogItem;
      });
    });

    this.receiptTxId = 'TX-' + Math.floor(100000 + Math.random() * 900000).toString();
    this.receiptDate = new Date().toLocaleString();
    this.isReceiptOpen = true;
    this.cdr.markForCheck();
  }

  closeReceipt() {
    this.isReceiptOpen = false;
    this.cart.set([]);
    this.discountPercent = 0;
    this.insurancePercent = 0;
    this.cdr.markForCheck();
  }

  showNotification(message: string, styleClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: styleClass,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
