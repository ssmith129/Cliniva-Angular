export class SurgeryRecord {
  id: number;
  surgeryId: string;
  patientName: string;
  patientImg: string;
  surgeryType: string;
  surgeonName: string;
  surgeryDate: string;
  startTime: string;
  endTime: string;
  outcome: string;
  anesthesiaType: string;
  complications: string;
  bloodLoss: string;
  notes: string;

  constructor(record: Partial<SurgeryRecord>) {
    this.id = record.id || this.getRandomID();
    this.surgeryId = record.surgeryId || '';
    this.patientName = record.patientName || '';
    this.patientImg = record.patientImg || 'assets/images/user/user1.jpg';
    this.surgeryType = record.surgeryType || '';
    this.surgeonName = record.surgeonName || '';
    this.surgeryDate = record.surgeryDate || new Date().toISOString();
    this.startTime = record.startTime || '';
    this.endTime = record.endTime || '';
    this.outcome = record.outcome || 'Successful';
    this.anesthesiaType = record.anesthesiaType || '';
    this.complications = record.complications || '';
    this.bloodLoss = record.bloodLoss || '';
    this.notes = record.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
