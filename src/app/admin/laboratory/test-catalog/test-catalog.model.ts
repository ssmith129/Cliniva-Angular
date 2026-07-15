

export class TestCatalog {
  id: number;
  code: string;
  testName: string;
  category: string;
  department: string;
  sampleType: string;
  price: number;
  duration: string;
  status: string;
  description: string;

  constructor(testCatalog: Partial<TestCatalog>) {
    this.id = testCatalog.id || this.getRandomID();
    this.code = testCatalog.code || '';
    this.testName = testCatalog.testName || '';
    this.category = testCatalog.category || '';
    this.department = testCatalog.department || '';
    this.sampleType = testCatalog.sampleType || '';
    this.price = testCatalog.price || 0;
    this.duration = testCatalog.duration || '';
    this.status = testCatalog.status || 'Active';
    this.description = testCatalog.description || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}