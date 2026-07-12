export class BreakdownReport {
  id: number;
  breakdown_id: string;
  equipment_id: string;
  equipment_name: string;
  department: string;
  reported_date: string;
  reported_time: string;
  reported_by: string;
  problem_description: string;
  severity: string;
  status: string;
  assigned_to: string;
  resolution_date: string;
  resolution_time: string;
  downtime_hours: string;
  repair_cost: string;
  action_taken: string;
  notes: string;

  constructor(report: Partial<BreakdownReport>) {
    this.id = report.id || this.getRandomID();
    this.breakdown_id = report.breakdown_id || '';
    this.equipment_id = report.equipment_id || '';
    this.equipment_name = report.equipment_name || '';
    this.department = report.department || 'Radiology';
    this.reported_date = report.reported_date || new Date().toISOString();
    this.reported_time = report.reported_time || '';
    this.reported_by = report.reported_by || '';
    this.problem_description = report.problem_description || '';
    this.severity = report.severity || 'Low';
    this.status = report.status || 'Reported';
    this.assigned_to = report.assigned_to || '';
    this.resolution_date = report.resolution_date || '';
    this.resolution_time = report.resolution_time || '';
    this.downtime_hours = report.downtime_hours || '';
    this.repair_cost = report.repair_cost || '';
    this.action_taken = report.action_taken || '';
    this.notes = report.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
