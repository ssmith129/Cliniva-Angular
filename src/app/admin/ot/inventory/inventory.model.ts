export class InventoryItem {
  id: number;
  itemId: string;
  itemName: string;
  itemImg: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplier: string;
  expiryDate: string;
  status: string;
  notes: string;

  constructor(item: Partial<InventoryItem>) {
    this.id = item.id || this.getRandomID();
    this.itemId = item.itemId || '';
    this.itemName = item.itemName || '';
    this.itemImg = item.itemImg || 'assets/images/user/user1.jpg';
    this.category = item.category || '';
    this.quantity = item.quantity || 0;
    this.unit = item.unit || 'pcs';
    this.reorderLevel = item.reorderLevel || 10;
    this.supplier = item.supplier || '';
    this.expiryDate = item.expiryDate || new Date().toISOString();
    this.status = item.status || 'In Stock';
    this.notes = item.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
