export class PatientFeedback {
  id: number;
  feedback_id: string;
  patient_name: string;
  patientImg: string;
  feedback_date: string;
  category: string;
  rating: string;
  status: string;
  feedback_text: string;
  reviewed_by: string;
  action_taken: string;
  notes: string;

  constructor(feedback: Partial<PatientFeedback>) {
    this.id = feedback.id || this.getRandomID();
    this.feedback_id = feedback.feedback_id || '';
    this.patient_name = feedback.patient_name || '';
    this.patientImg = feedback.patientImg || 'assets/images/user/user1.jpg';
    this.feedback_date = feedback.feedback_date || new Date().toISOString();
    this.category = feedback.category || '';
    this.rating = feedback.rating || '';
    this.status = feedback.status || 'Pending';
    this.feedback_text = feedback.feedback_text || '';
    this.reviewed_by = feedback.reviewed_by || '';
    this.action_taken = feedback.action_taken || '';
    this.notes = feedback.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
