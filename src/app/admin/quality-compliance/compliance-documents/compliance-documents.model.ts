export class ComplianceDocument {
  id: number;
  document_id: string;
  document_name: string;
  document_type: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  renewal_date: string;
  document_number: string;
  status: string;
  responsible_person: string;
  department: string;
  file_location: string;
  notes: string;

  constructor(doc: Partial<ComplianceDocument>) {
    this.id = doc.id || this.getRandomID();
    this.document_id = doc.document_id || '';
    this.document_name = doc.document_name || '';
    this.document_type = doc.document_type || '';
    this.issuing_authority = doc.issuing_authority || '';
    this.issue_date = doc.issue_date || new Date().toISOString();
    this.expiry_date = doc.expiry_date || '';
    this.renewal_date = doc.renewal_date || '';
    this.document_number = doc.document_number || '';
    this.status = doc.status || 'Valid';
    this.responsible_person = doc.responsible_person || '';
    this.department = doc.department || '';
    this.file_location = doc.file_location || '';
    this.notes = doc.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
