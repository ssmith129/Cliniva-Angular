import { formatDate } from '@angular/common';

export class RadiologyReport {
  id: number;
  img: string;
  patientName: string;
  scanType: string;
  modality: string;
  referredBy: string;
  reportDate: string;
  tat: string;
  status: string;

  constructor(radiologyReport: RadiologyReport) {
    this.id = radiologyReport.id || this.getRandomID();
    this.img = radiologyReport.img || 'assets/images/user/user1.jpg';
    this.patientName = radiologyReport.patientName || '';
    this.scanType = radiologyReport.scanType || '';
    this.modality = radiologyReport.modality || '';
    this.referredBy = radiologyReport.referredBy || '';
    this.reportDate = radiologyReport.reportDate || formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.tat = radiologyReport.tat || '';
    this.status = radiologyReport.status || 'Pending';
  }

  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
