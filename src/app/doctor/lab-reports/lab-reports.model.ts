export interface LabReport {
  id: number;
  reportId: string;
  patientName: string;
  img: string;
  patientId: string;
  testName: string;
  testType: string; // Blood Test, Radiology, Pathology, etc.
  requestDate: string;
  reportDate?: string;
  requestedBy: string;
  status: string; // Pending, Completed, Critical
  priority: string; // Routine, Urgent, STAT
}

export interface LabReportDetail {
  id: number;
  reportId: string;
  patientName: string;
  patientId: string;
  testName: string;
  testType: string;
  requestDate: string;
  reportDate?: string;
  requestedBy: string;
  performedBy?: string;
  status: string;
  priority: string;

  // Test Results
  results: TestResult[];

  // Additional Information
  specimen: string;
  collectionDate: string;
  receivedDate: string;
  notes: string;
  interpretation: string;
  recommendations: string;
  attachments?: string[];
}

export interface TestResult {
  parameter: string;
  result: string;
  unit: string;
  normalRange: string;
  flag: string; // Normal, High, Low, Critical
}
