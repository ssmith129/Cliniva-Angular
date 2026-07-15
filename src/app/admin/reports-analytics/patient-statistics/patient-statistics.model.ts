import { formatDate } from '@angular/common';

export class PatientStatistic {
  id: number;
  img: string;
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  diagnosis: string;
  admissionDate: string;
  ward: string;
  status: string;

  constructor(stat: PatientStatistic) {
    this.id = stat.id || this.getRandomID();
    this.img = stat.img || 'assets/images/user/user1.jpg';
    this.patientName = stat.patientName || '';
    this.age = stat.age || 0;
    this.gender = stat.gender || '';
    this.bloodGroup = stat.bloodGroup || '';
    this.diagnosis = stat.diagnosis || '';
    this.admissionDate = stat.admissionDate || formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.ward = stat.ward || '';
    this.status = stat.status || 'Admitted';
  }

  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
