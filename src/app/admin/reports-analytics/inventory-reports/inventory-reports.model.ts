import { formatDate } from '@angular/common';

export class InventoryReport {
  id: number;
  itemName: string;
  category: string;
  stockLevel: number;
  unit: string;
  status: string;
  lastUpdated: string;

  constructor(inventoryReport: InventoryReport) {
    {
      this.id = inventoryReport.id || this.getRandomID();
      this.itemName = inventoryReport.itemName || '';
      this.category = inventoryReport.category || '';
      this.stockLevel = inventoryReport.stockLevel || 0;
      this.unit = inventoryReport.unit || 'Units';
      this.status = inventoryReport.status || 'In Stock';
      this.lastUpdated = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
