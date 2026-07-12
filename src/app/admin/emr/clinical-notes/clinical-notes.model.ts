export class ClinicalNote {
  id: number;
  patientName: string;
  patientImg: string;
  doctorName: string;
  noteType: string;
  noteDate: string;
  content: string;
  status: string;

  constructor(note: Partial<ClinicalNote>) {
    this.id = note.id || this.getRandomID();
    this.patientName = note.patientName || '';
    this.patientImg = note.patientImg || 'assets/images/user/user1.jpg';
    this.doctorName = note.doctorName || '';
    this.noteType = note.noteType || '';
    this.noteDate = note.noteDate || new Date().toISOString();
    this.content = note.content || '';
    this.status = note.status || 'Draft';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}