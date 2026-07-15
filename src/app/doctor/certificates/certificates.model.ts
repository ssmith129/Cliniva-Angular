export interface Certificate {
  id: number;
  certificateId: string;
  patientName: string;
  img: string;
  patientId: string;
  certificateType: string;
  issueDate: string;
  validUntil?: string;
  purpose: string;
  issuedBy: string;
  status: string;
}
