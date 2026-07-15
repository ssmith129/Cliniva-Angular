export class Clearance {
  id: number;
  clearanceId: string;
  patientName: string;
  patientImg: string;
  department: string;
  requestedDate: string;
  clearedDate: string;
  status: string;
  clearedBy: string;
  notes: string;

  constructor(clearance: Partial<Clearance>) {
    this.id = clearance.id || this.getRandomID();
    this.clearanceId = clearance.clearanceId || '';
    this.patientName = clearance.patientName || '';
    this.patientImg = clearance.patientImg || 'assets/images/user/user1.jpg';
    this.department = clearance.department || '';
    this.requestedDate = clearance.requestedDate || new Date().toISOString();
    this.clearedDate = clearance.clearedDate || new Date().toISOString();
    this.status = clearance.status || 'Pending';
    this.clearedBy = clearance.clearedBy || '';
    this.notes = clearance.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
