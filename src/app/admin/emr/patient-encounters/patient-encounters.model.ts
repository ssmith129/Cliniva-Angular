export class PatientEncounter {
  id: number;
  encounterId: string;
  patientName: string;
  patientImg: string;
  doctorName: string;
  encounterDate: string;
  encounterType: string;
  department: string;
  diagnosis: string;
  status: string;

  constructor(encounter: Partial<PatientEncounter>) {
    this.id = encounter.id || this.getRandomID();
    this.encounterId = encounter.encounterId || '';
    this.patientName = encounter.patientName || '';
    this.patientImg = encounter.patientImg || 'assets/images/user/user1.jpg';
    this.doctorName = encounter.doctorName || '';
    this.encounterDate = encounter.encounterDate || new Date().toISOString();
    this.encounterType = encounter.encounterType || 'OPD';
    this.department = encounter.department || '';
    this.diagnosis = encounter.diagnosis || '';
    this.status = encounter.status || 'In Progress';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
