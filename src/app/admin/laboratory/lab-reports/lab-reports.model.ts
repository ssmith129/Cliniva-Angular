export class LabReport {
  id: number;
  reportId: string;
  patientName: string;
  patientImg: string;
  tests: string;
  doctorName: string;
  reportDate: string;
  status: string;
  department: string;

  constructor(labReport: Partial<LabReport>) {
    this.id = labReport.id || this.getRandomID();
    this.reportId = labReport.reportId || '';
    this.patientName = labReport.patientName || '';
    this.patientImg = labReport.patientImg || 'assets/images/user/user1.jpg';
    this.tests = labReport.tests || '';
    this.doctorName = labReport.doctorName || '';
    this.reportDate = labReport.reportDate || new Date().toISOString();
    this.status = labReport.status || 'Available';
    this.department = labReport.department || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}