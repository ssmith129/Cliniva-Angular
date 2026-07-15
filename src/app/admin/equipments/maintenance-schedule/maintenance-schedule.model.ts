export class MaintenanceSchedule {
  id: number;
  maintenance_id: string;
  equipment_id: string;
  equipment_name: string;
  maintenance_type: string;
  scheduled_date: string;
  scheduled_time: string;
  performed_by: string;
  vendor_name: string;
  estimated_duration: string;
  status: string;
  completion_date: string;
  next_maintenance: string;
  cost: string;
  work_performed: string;
  notes: string;

  constructor(schedule: Partial<MaintenanceSchedule>) {
    this.id = schedule.id || this.getRandomID();
    this.maintenance_id = schedule.maintenance_id || '';
    this.equipment_id = schedule.equipment_id || '';
    this.equipment_name = schedule.equipment_name || '';
    this.maintenance_type = schedule.maintenance_type || 'Preventive';
    this.scheduled_date = schedule.scheduled_date || new Date().toISOString();
    this.scheduled_time = schedule.scheduled_time || '';
    this.performed_by = schedule.performed_by || '';
    this.vendor_name = schedule.vendor_name || '';
    this.estimated_duration = schedule.estimated_duration || '';
    this.status = schedule.status || 'Scheduled';
    this.completion_date = schedule.completion_date || '';
    this.next_maintenance = schedule.next_maintenance || '';
    this.cost = schedule.cost || '';
    this.work_performed = schedule.work_performed || '';
    this.notes = schedule.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
