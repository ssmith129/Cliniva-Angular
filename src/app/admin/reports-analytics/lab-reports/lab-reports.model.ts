import { formatDate } from '@angular/common';

export class LabAnalyticsReport {
  id: number;
  img: string;
  patientName: string;
  testName: string;
  testCategory: string;
  requestedBy: string;
  sampleDate: string;
  tat: string;
  status: string;

  constructor(report: LabAnalyticsReport) {
    this.id = report.id || this.getRandomID();
    this.img = report.img || 'assets/images/user/user1.jpg';
    this.patientName = report.patientName || '';
    this.testName = report.testName || '';
    this.testCategory = report.testCategory || '';
    this.requestedBy = report.requestedBy || '';
    this.sampleDate = report.sampleDate || formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.tat = report.tat || '';
    this.status = report.status || 'Pending';
  }

  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
