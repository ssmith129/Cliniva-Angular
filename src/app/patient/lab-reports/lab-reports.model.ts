export interface LabReport {
  id: number;
  reportId: string;
  testName: string;
  testType: string;
  requestDate: string;
  reportDate?: string;
  status: string;
  priority: string;
  doctorName: string;
  labName: string;
  results?: string;
}
