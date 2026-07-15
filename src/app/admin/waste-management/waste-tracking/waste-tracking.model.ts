export class WasteTracking {
  id: number;
  waste_id: string;
  waste_type: string;
  category: string;
  quantity: string;
  department: string;
  collection_date: string;
  collection_time: string;
  collected_by: string;
  status: string;
  storage_location: string;
  notes: string;

  constructor(waste: Partial<WasteTracking>) {
    this.id = waste.id || this.getRandomID();
    this.waste_id = waste.waste_id || '';
    this.waste_type = waste.waste_type || '';
    this.category = waste.category || '';
    this.quantity = waste.quantity || '';
    this.department = waste.department || '';
    this.collection_date = waste.collection_date || new Date().toISOString();
    this.collection_time = waste.collection_time || '';
    this.collected_by = waste.collected_by || '';
    this.status = waste.status || 'Collected';
    this.storage_location = waste.storage_location || '';
    this.notes = waste.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
