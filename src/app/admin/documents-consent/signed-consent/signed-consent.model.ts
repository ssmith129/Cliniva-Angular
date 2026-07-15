export class SignedConsent {
  id: number;
  consent_id: string;
  patient_name: string;
  patientImg: string;
  consent_type: string;
  procedure_name: string;
  signed_date: string;
  signed_time: string;
  signed_by: string;
  relationship: string;
  witness_name: string;
  witness_designation: string;
  expiry_date: string;
  status: string;
  notes: string;

  constructor(consent: Partial<SignedConsent>) {
    this.id = consent.id || this.getRandomID();
    this.consent_id = consent.consent_id || '';
    this.patient_name = consent.patient_name || '';
    this.patientImg = consent.patientImg || 'assets/images/user/user1.jpg';
    this.consent_type = consent.consent_type || '';
    this.procedure_name = consent.procedure_name || '';
    this.signed_date = consent.signed_date || new Date().toISOString();
    this.signed_time = consent.signed_time || '';
    this.signed_by = consent.signed_by || '';
    this.relationship = consent.relationship || 'Self';
    this.witness_name = consent.witness_name || '';
    this.witness_designation = consent.witness_designation || '';
    this.expiry_date = consent.expiry_date || '';
    this.status = consent.status || 'Pending';
    this.notes = consent.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
