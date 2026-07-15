export class ImagingReport {
  id: number;
  reportId: string;
  patientName: string;
  scanType: string;
  radiologistName: string;
  reportDate: string;
  findings: string;
  status: string;
  impression: string;
  recommendations: string;

  constructor(report: Partial<ImagingReport>) {
    this.id = report.id || this.getRandomID();
    this.reportId = report.reportId || '';
    this.patientName = report.patientName || '';
    this.scanType = report.scanType || '';
    this.radiologistName = report.radiologistName || '';
    this.reportDate = report.reportDate || new Date().toISOString();
    this.findings = report.findings || '';
    this.status = report.status || 'Draft';
    this.impression = report.impression || '';
    this.recommendations = report.recommendations || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
