export class VirtualVisitRecord {
  id: number;
  visit_id: string;
  patient_name: string;
  patientImg: string;
  doctor_name: string;
  visit_date: string;
  duration: string;
  chief_complaint: string;
  diagnosis: string;
  prescription: string;
  follow_up_date: string;
  notes: string;

  constructor(record: Partial<VirtualVisitRecord>) {
    this.id = record.id || this.getRandomID();
    this.visit_id = record.visit_id || '';
    this.patient_name = record.patient_name || '';
    this.patientImg = record.patientImg || 'assets/images/user/user1.jpg';
    this.doctor_name = record.doctor_name || '';
    this.visit_date = record.visit_date || new Date().toISOString();
    this.duration = record.duration || '';
    this.chief_complaint = record.chief_complaint || '';
    this.diagnosis = record.diagnosis || '';
    this.prescription = record.prescription || '';
    this.follow_up_date = record.follow_up_date || '';
    this.notes = record.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
