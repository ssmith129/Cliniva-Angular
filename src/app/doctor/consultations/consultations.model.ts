export interface Consultation {
  id: number;
  consultationId: string;
  patientName: string;
  img: string;
  patientId: string;
  consultationDate: string;
  consultationTime: string;
  chiefComplaint: string;
  diagnosis: string;
  doctor: string;
  status: string; // Completed, In Progress, Scheduled
}

export interface ConsultationDetail {
  id: number;
  consultationId: string;
  patientName: string;
  patientId: string;
  consultationDate: string;
  consultationTime: string;

  // SOAP Notes
  subjective: string; // Patient's symptoms and complaints
  objective: string; // Physical examination findings
  assessment: string; // Diagnosis and clinical impression
  plan: string; // Treatment plan and recommendations

  // Vital Signs
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  oxygenSaturation: number;

  // Additional Information
  icdCode: string;
  chiefComplaint: string;
  presentingSymptoms: string;
  duration: string;
  attachments?: string[];
  notes: string;
  followUpDate?: string;
  status: string;
  doctor: string;
}
