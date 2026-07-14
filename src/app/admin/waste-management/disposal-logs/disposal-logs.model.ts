export class DisposalLog {
  id: number;
  disposal_id: string;
  waste_id: string;
  waste_type: string;
  quantity: string;
  disposal_date: string;
  disposal_time: string;
  disposal_method: string;
  vendor_name: string;
  vendor_license: string;
  transport_vehicle: string;
  authorized_by: string;
  compliance_status: string;
  certificate_number: string;
  notes: string;

  constructor(log: Partial<DisposalLog>) {
    this.id = log.id || this.getRandomID();
    this.disposal_id = log.disposal_id || '';
    this.waste_id = log.waste_id || '';
    this.waste_type = log.waste_type || '';
    this.quantity = log.quantity || '';
    this.disposal_date = log.disposal_date || new Date().toISOString();
    this.disposal_time = log.disposal_time || '';
    this.disposal_method = log.disposal_method || '';
    this.vendor_name = log.vendor_name || '';
    this.vendor_license = log.vendor_license || '';
    this.transport_vehicle = log.transport_vehicle || '';
    this.authorized_by = log.authorized_by || '';
    this.compliance_status = log.compliance_status || 'Compliant';
    this.certificate_number = log.certificate_number || '';
    this.notes = log.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
