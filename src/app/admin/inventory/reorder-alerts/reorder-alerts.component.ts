import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface ReorderItem {
  id: number;
  i_name: string;
  category: string;
  qty: number;
  reorderLevel: number;
  supplier: string;
  status: 'Low' | 'Out of Stock';
  isOrdered?: boolean;
}

@Component({
  selector: 'app-reorder-alerts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BreadcrumbComponent,
  ],
  templateUrl: './reorder-alerts.component.html',
  styleUrls: ['./reorder-alerts.component.scss']
})
export class ReorderAlertsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['i_name', 'category', 'qty_progress', 'reorderLevel', 'supplier', 'status', 'actions'];
  dataSource = new MatTableDataSource<ReorderItem>([]);
  isLoading = false;

  // Stats
  lowStockCount = 0;
  outOfStockCount = 0;
  pendingReorders = 0;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const mockData: ReorderItem[] = [
      {
        id: 1,
        i_name: 'N95 Respirator Masks',
        category: 'PPE',
        qty: 8,
        reorderLevel: 100,
        supplier: 'Lifeline Supplies',
        status: 'Out of Stock',
        isOrdered: false
      },
      {
        id: 2,
        i_name: 'Surgical Gloves (Size M)',
        category: 'PPE',
        qty: 25,
        reorderLevel: 200,
        supplier: 'Lifeline Supplies',
        status: 'Low',
        isOrdered: false
      },
      {
        id: 3,
        i_name: 'Amoxicillin 500mg',
        category: 'Pharmaceuticals',
        qty: 12,
        reorderLevel: 50,
        supplier: 'Global Pharma Co.',
        status: 'Low',
        isOrdered: false
      },
      {
        id: 4,
        i_name: 'Disposable Syringes (5ml)',
        category: 'Consumables',
        qty: 0,
        reorderLevel: 150,
        supplier: 'MedTech Solutions',
        status: 'Out of Stock',
        isOrdered: false
      },
      {
        id: 5,
        i_name: 'Saline IV Fluid 500ml',
        category: 'IV Fluids',
        qty: 30,
        reorderLevel: 100,
        supplier: 'Global Pharma Co.',
        status: 'Low',
        isOrdered: false
      },
      {
        id: 6,
        i_name: 'Scalpel Blades (Size 11)',
        category: 'Surgical Instruments',
        qty: 15,
        reorderLevel: 40,
        supplier: 'MedTech Solutions',
        status: 'Low',
        isOrdered: false
      }
    ];

    this.dataSource.data = mockData;
    this.recalculateStats();
  }

  recalculateStats() {
    const data = this.dataSource.data;
    this.lowStockCount = data.filter(item => item.status === 'Low' && !item.isOrdered).length;
    this.outOfStockCount = data.filter(item => item.status === 'Out of Stock' && !item.isOrdered).length;
  }

  handleQuickOrder(row: ReorderItem) {
    this.pendingReorders++;
    
    this.dataSource.data = this.dataSource.data.map(item => {
      if (item.id === row.id) {
        return {
          ...item,
          isOrdered: true
        };
      }
      return item;
    });

    this.recalculateStats();

    this.showNotification(
      'snackbar-success',
      `Auto PO generated & sent to ${row.supplier} for ${row.i_name}.`
    );
  }

  handleRefresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadData();
      this.pendingReorders = 0;
      this.isLoading = false;
      this.showNotification('snackbar-success', 'Reorder Alerts updated.');
    }, 500);
  }

  showNotification(colorName: string, text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: colorName
    });
  }

  getProgressValue(qty: number, level: number): number {
    if (level === 0) return 0;
    const pct = (qty / level) * 100;
    return Math.min(Math.round(pct), 100);
  }
}
