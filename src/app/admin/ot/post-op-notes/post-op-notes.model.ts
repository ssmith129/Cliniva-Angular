export class PostOpNote {
  id: number;
  noteId: string;
  patientName: string;
  patientImg: string;
  surgeryType: string;
  noteDate: string;
  recordedBy: string;
  vitalSigns: string;
  painLevel: string;
  recoveryStatus: string;
  woundCondition: string;
  medicationsAdministered: string;
  complications: string;
  dietInstructions: string;
  mobilityStatus: string;
  dischargePlan: string;
  notes: string;

  constructor(note: Partial<PostOpNote>) {
    this.id = note.id || this.getRandomID();
    this.noteId = note.noteId || '';
    this.patientName = note.patientName || '';
    this.patientImg = note.patientImg || 'assets/images/user/user1.jpg';
    this.surgeryType = note.surgeryType || '';
    this.noteDate = note.noteDate || new Date().toISOString();
    this.recordedBy = note.recordedBy || '';
    this.vitalSigns = note.vitalSigns || '';
    this.painLevel = note.painLevel || '';
    this.recoveryStatus = note.recoveryStatus || 'Good';
    this.woundCondition = note.woundCondition || '';
    this.medicationsAdministered = note.medicationsAdministered || '';
    this.complications = note.complications || '';
    this.dietInstructions = note.dietInstructions || '';
    this.mobilityStatus = note.mobilityStatus || '';
    this.dischargePlan = note.dischargePlan || '';
    this.notes = note.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
