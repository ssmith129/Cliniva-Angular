export class Complaint {
  id: number;
  complaint_id: string;
  patient_name: string;
  patientImg: string;
  complaint_date: string;
  category: string;
  priority: string;
  status: string;
  complaint_details: string;
  assigned_to: string;
  resolution_date: string;
  resolution_details: string;
  notes: string;

  constructor(complaint: Partial<Complaint>) {
    this.id = complaint.id || this.getRandomID();
    this.complaint_id = complaint.complaint_id || '';
    this.patient_name = complaint.patient_name || '';
    this.patientImg = complaint.patientImg || 'assets/images/user/user1.jpg';
    this.complaint_date = complaint.complaint_date || new Date().toISOString();
    this.category = complaint.category || '';
    this.priority = complaint.priority || 'Low';
    this.status = complaint.status || 'Pending';
    this.complaint_details = complaint.complaint_details || '';
    this.assigned_to = complaint.assigned_to || '';
    this.resolution_date = complaint.resolution_date || '';
    this.resolution_details = complaint.resolution_details || '';
    this.notes = complaint.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
