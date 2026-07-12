export class ScanTracking {
  id: number;
  scanId: string;
  patientName: string;
  scanType: string;
  modality: string;
  technicianName: string;
  scanDate: string;
  duration: string;
  status: string;
  notes: string;

  constructor(scan: Partial<ScanTracking>) {
    this.id = scan.id || this.getRandomID();
    this.scanId = scan.scanId || '';
    this.patientName = scan.patientName || '';
    this.scanType = scan.scanType || '';
    this.modality = scan.modality || 'X-Ray';
    this.technicianName = scan.technicianName || '';
    this.scanDate = scan.scanDate || new Date().toISOString();
    this.duration = scan.duration || '';
    this.status = scan.status || 'Scheduled';
    this.notes = scan.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
