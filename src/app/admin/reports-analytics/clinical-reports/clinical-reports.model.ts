import { formatDate } from '@angular/common';

export class ClinicalReport {
  id: number;
  img: string;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  visitDate: string;
  status: string;

  constructor(clinicalReport: ClinicalReport) {
    {
      this.id = clinicalReport.id || this.getRandomID();
      this.img = clinicalReport.img || 'assets/images/user/user1.jpg';
      this.patientName = clinicalReport.patientName || '';
      this.doctorName = clinicalReport.doctorName || '';
      this.diagnosis = clinicalReport.diagnosis || '';
      this.visitDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.status = clinicalReport.status || 'Under Treatment';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
