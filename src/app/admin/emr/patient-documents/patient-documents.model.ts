export class PatientDocument {
  id: number;
  docId: string;
  patientName: string;
  patientImg: string;
  docType: string;
  uploadDate: string;
  uploadedBy: string;
  fileUrl: string;
  fileSize: string;
  status: string;

  constructor(document: Partial<PatientDocument>) {
    this.id = document.id || this.getRandomID();
    this.docId = document.docId || '';
    this.patientName = document.patientName || '';
    this.patientImg = document.patientImg || 'assets/images/user/user1.jpg';
    this.docType = document.docType || '';
    this.uploadDate = document.uploadDate || new Date().toISOString();
    this.uploadedBy = document.uploadedBy || '';
    this.fileUrl = document.fileUrl || '';
    this.fileSize = document.fileSize || '';
    this.status = document.status || 'Uploaded';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
