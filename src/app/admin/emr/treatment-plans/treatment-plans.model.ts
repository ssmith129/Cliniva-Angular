export class TreatmentPlan {
  id: number;
  patientName: string;
  patientImg: string;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  startDate: string;
  endDate: string;
  status: string;

  constructor(plan: Partial<TreatmentPlan>) {
    this.id = plan.id || this.getRandomID();
    this.patientName = plan.patientName || '';
    this.patientImg = plan.patientImg || 'assets/images/user/user1.jpg';
    this.doctorName = plan.doctorName || '';
    this.diagnosis = plan.diagnosis || '';
    this.treatment = plan.treatment || '';
    this.startDate = plan.startDate || new Date().toISOString();
    this.endDate = plan.endDate || new Date().toISOString();
    this.status = plan.status || 'Active';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}