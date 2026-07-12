export interface TelemedicineSession {
  id: number;
  sessionId: string;
  patientName: string;
  img: string;
  patientId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  consultationType: string;
  status: string;
  doctor: string;
}
