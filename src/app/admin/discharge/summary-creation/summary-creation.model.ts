export class DischargeSummary {
  id: number;
  summaryId: string;
  patientName: string;
  patientImg: string;
  admissionDate: string;
  dischargeDate: string;
  primaryDiagnosis: string;
  proceduresPerformed: string;
  treatmentGiven: string;
  followUpInstructions: string;
  author: string;
  status: string;
  notes: string;

  constructor(summary: Partial<DischargeSummary>) {
    this.id = summary.id || this.getRandomID();
    this.summaryId = summary.summaryId || '';
    this.patientName = summary.patientName || '';
    this.patientImg = summary.patientImg || 'assets/images/user/user1.jpg';
    this.admissionDate = summary.admissionDate || new Date().toISOString();
    this.dischargeDate = summary.dischargeDate || new Date().toISOString();
    this.primaryDiagnosis = summary.primaryDiagnosis || '';
    this.proceduresPerformed = summary.proceduresPerformed || '';
    this.treatmentGiven = summary.treatmentGiven || '';
    this.followUpInstructions = summary.followUpInstructions || '';
    this.author = summary.author || '';
    this.status = summary.status || 'Draft';
    this.notes = summary.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
