export interface Prescription {
  id: number;
  prescriptionId: string;
  patientName: string;
  img: string;
  patientId: string;
  prescriptionDate: string;
  medications: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  status: string; // Active, Completed, Cancelled
}
