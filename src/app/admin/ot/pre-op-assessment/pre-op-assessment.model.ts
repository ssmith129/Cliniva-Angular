export class PreOpAssessment {
  id: number;
  assessmentId: string;
  patientName: string;
  patientImg: string;
  surgeryType: string;
  assessmentDate: string;
  assessedBy: string;
  vitalSigns: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  fitnessStatus: string;
  riskLevel: string;
  recommendations: string;
  notes: string;

  constructor(assessment: Partial<PreOpAssessment>) {
    this.id = assessment.id || this.getRandomID();
    this.assessmentId = assessment.assessmentId || '';
    this.patientName = assessment.patientName || '';
    this.patientImg = assessment.patientImg || 'assets/images/user/user1.jpg';
    this.surgeryType = assessment.surgeryType || '';
    this.assessmentDate = assessment.assessmentDate || new Date().toISOString();
    this.assessedBy = assessment.assessedBy || '';
    this.vitalSigns = assessment.vitalSigns || '';
    this.medicalHistory = assessment.medicalHistory || '';
    this.currentMedications = assessment.currentMedications || '';
    this.allergies = assessment.allergies || '';
    this.fitnessStatus = assessment.fitnessStatus || 'Fit';
    this.riskLevel = assessment.riskLevel || 'Low';
    this.recommendations = assessment.recommendations || '';
    this.notes = assessment.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
