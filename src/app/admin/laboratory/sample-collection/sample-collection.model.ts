export class SampleCollection {
  id: number;
  sampleId: string;
  patientName: string;
  testName: string;
  sampleType: string;
  collectionDate: string;
  collectedBy: string;
  status: string;

  constructor(sampleCollection: Partial<SampleCollection>) {
    this.id = sampleCollection.id || this.getRandomID();
    this.sampleId = sampleCollection.sampleId || '';
    this.patientName = sampleCollection.patientName || '';
    this.testName = sampleCollection.testName || '';
    this.sampleType = sampleCollection.sampleType || '';
    this.collectionDate = sampleCollection.collectionDate || new Date().toISOString();
    this.collectedBy = sampleCollection.collectedBy || '';
    this.status = sampleCollection.status || 'Pending';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
