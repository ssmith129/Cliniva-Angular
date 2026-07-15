export class VideoConsultation {
  id: number;
  consultation_id: string;
  patient_name: string;
  patientImg: string;
  doctor_name: string;
  scheduled_date: string;
  scheduled_time: string;
  duration: string;
  status: string;
  meeting_link: string;
  notes: string;

  constructor(consultation: Partial<VideoConsultation>) {
    this.id = consultation.id || this.getRandomID();
    this.consultation_id = consultation.consultation_id || '';
    this.patient_name = consultation.patient_name || '';
    this.patientImg = consultation.patientImg || 'assets/images/user/user1.jpg';
    this.doctor_name = consultation.doctor_name || '';
    this.scheduled_date = consultation.scheduled_date || new Date().toISOString();
    this.scheduled_time = consultation.scheduled_time || '';
    this.duration = consultation.duration || '';
    this.status = consultation.status || 'Scheduled';
    this.meeting_link = consultation.meeting_link || '';
    this.notes = consultation.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
