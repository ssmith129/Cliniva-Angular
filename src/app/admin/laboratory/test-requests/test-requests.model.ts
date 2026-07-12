export class TestRequest {
  id: number;
  requestId: string;
  patientName: string;
  patientImg: string;
  doctorName: string;
  testName: string;
  date: string;
  status: string;
  priority: string;
  requestDate: string;
  sampleType: string;
  notes: string;

  constructor(testRequest: Partial<TestRequest>) {
    this.id = testRequest.id || this.getRandomID();
    this.requestId = testRequest.requestId || '';
    this.patientName = testRequest.patientName || '';
    this.patientImg = testRequest.patientImg || 'assets/images/user/user1.jpg';
    this.doctorName = testRequest.doctorName || '';
    this.testName = testRequest.testName || '';
    this.date = testRequest.date || new Date().toISOString();
    this.status = testRequest.status || 'Pending';
    this.priority = testRequest.priority || 'Normal';
    this.requestDate = testRequest.requestDate || '';
    this.sampleType = testRequest.sampleType || '';
    this.notes = testRequest.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
