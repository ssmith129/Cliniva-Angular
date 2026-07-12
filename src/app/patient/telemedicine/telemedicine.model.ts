export interface TelemedicineSession {
  id: number;
  sessionId: string;
  doctorName: string;
  img: string;
  specialty: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  consultationType: string;
  status: string;
  notes?: string;
}
