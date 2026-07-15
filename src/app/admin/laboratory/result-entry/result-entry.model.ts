export class ResultEntry {
  id: number;
  testRequestId: string;
  patientName: string;
  testName: string;
  sampleId: string;
  resultValue: string;
  units: string;
  normalRange: string;
  comments: string;
  verifiedBy: string;
  reportFile: string;

  constructor(resultEntry: Partial<ResultEntry>) {
    this.id = resultEntry.id || this.getRandomID();
    this.testRequestId = resultEntry.testRequestId || '';
    this.patientName = resultEntry.patientName || '';
    this.testName = resultEntry.testName || '';
    this.sampleId = resultEntry.sampleId || '';
    this.resultValue = resultEntry.resultValue || '';
    this.units = resultEntry.units || '';
    this.normalRange = resultEntry.normalRange || '';
    this.comments = resultEntry.comments || '';
    this.verifiedBy = resultEntry.verifiedBy || '';
    this.reportFile = resultEntry.reportFile || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
