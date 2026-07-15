export class Equipment {
  id: number;
  equipment_id: string;
  equipment_name: string;
  category: string;
  department: string;
  manufacturer: string;
  model_number: string;
  serial_number: string;
  purchase_date: string;
  purchase_cost: string;
  warranty_expiry: string;
  status: string;
  location: string;
  notes: string;

  constructor(equipment: Partial<Equipment>) {
    this.id = equipment.id || this.getRandomID();
    this.equipment_id = equipment.equipment_id || '';
    this.equipment_name = equipment.equipment_name || '';
    this.category = equipment.category || 'Diagnostic';
    this.department = equipment.department || 'Radiology';
    this.manufacturer = equipment.manufacturer || '';
    this.model_number = equipment.model_number || '';
    this.serial_number = equipment.serial_number || '';
    this.purchase_date = equipment.purchase_date || new Date().toISOString();
    this.purchase_cost = equipment.purchase_cost || '';
    this.warranty_expiry = equipment.warranty_expiry || '';
    this.status = equipment.status || 'Operational';
    this.location = equipment.location || '';
    this.notes = equipment.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
