export interface PatientRecord {
  id: number;
  img: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  registrationDate: string;
  lastVisitDate: string;
  totalVisits: number;
  status: string; // Active, Inactive, Critical
}
