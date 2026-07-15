export class MedicationHistory {
  id: number;
  medicationId: string;
  patientName: string;
  patientImg: string;
  drugName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: string;
  prescribedBy: string;

  constructor(medication: Partial<MedicationHistory>) {
    this.id = medication.id || this.getRandomID();
    this.medicationId = medication.medicationId || '';
    this.patientName = medication.patientName || '';
    this.patientImg = medication.patientImg || 'assets/images/user/user1.jpg';
    this.drugName = medication.drugName || '';
    this.dosage = medication.dosage || '';
    this.frequency = medication.frequency || '';
    this.startDate = medication.startDate || new Date().toISOString();
    this.endDate = medication.endDate || new Date().toISOString();
    this.status = medication.status || 'Active';
    this.prescribedBy = medication.prescribedBy || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
