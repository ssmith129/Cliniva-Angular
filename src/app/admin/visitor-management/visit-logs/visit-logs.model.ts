export class Visit {
  id: number;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  purpose: string;
  personToMeet: string;
  department: string;
  checkInTime: string;
  checkOutTime: string;
  visitDate: string;
  status: string;
  idProofType: string;
  idProofNumber: string;
  vehicleNumber: string;
  remarks: string;

  constructor(visit: Partial<Visit>) {
    this.id = visit.id || this.getRandomID();
    this.visitorName = visit.visitorName || '';
    this.visitorPhone = visit.visitorPhone || '';
    this.visitorEmail = visit.visitorEmail || '';
    this.purpose = visit.purpose || '';
    this.personToMeet = visit.personToMeet || '';
    this.department = visit.department || '';
    this.checkInTime = visit.checkInTime || '';
    this.checkOutTime = visit.checkOutTime || '';
    this.visitDate = visit.visitDate || new Date().toISOString();
    this.status = visit.status || 'Pending';
    this.idProofType = visit.idProofType || '';
    this.idProofNumber = visit.idProofNumber || '';
    this.vehicleNumber = visit.vehicleNumber || '';
    this.remarks = visit.remarks || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
