export class UploadDocument {
  id: number;
  document_id: string;
  patient_name: string;
  patientImg: string;
  document_type: string;
  document_name: string;
  upload_date: string;
  uploaded_by: string;
  file_size: string;
  status: string;
  notes: string;

  constructor(document: Partial<UploadDocument>) {
    this.id = document.id || this.getRandomID();
    this.document_id = document.document_id || '';
    this.patient_name = document.patient_name || '';
    this.patientImg = document.patientImg || 'assets/images/user/user1.jpg';
    this.document_type = document.document_type || '';
    this.document_name = document.document_name || '';
    this.upload_date = document.upload_date || new Date().toISOString();
    this.uploaded_by = document.uploaded_by || '';
    this.file_size = document.file_size || '';
    this.status = document.status || 'Pending';
    this.notes = document.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
