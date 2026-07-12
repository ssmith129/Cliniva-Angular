export interface Surgery {
  id: number;
  surgeryId: string;
  patientName: string;
  img: string;
  patientId: string;
  surgeryType: string;
  procedureName: string;
  surgeryDate: string;
  surgeryTime: string;
  duration: string;
  surgeon: string;
  assistingSurgeon?: string;
  anesthesiologist: string;
  operatingRoom: string;
  status: string; // Scheduled, In Progress, Completed, Cancelled
  priority: string; // Elective, Urgent, Emergency
}
