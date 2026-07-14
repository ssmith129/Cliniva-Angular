export class TestOrder {
  id: number;
  orderId: string;
  patientName: string;
  testName: string;
  orderingPhysician: string;
  orderDate: string;
  status: string;
  priority: string;
  notes: string;

  constructor(order: Partial<TestOrder>) {
    this.id = order.id || this.getRandomID();
    this.orderId = order.orderId || '';
    this.patientName = order.patientName || '';
    this.testName = order.testName || '';
    this.orderingPhysician = order.orderingPhysician || '';
    this.orderDate = order.orderDate || new Date().toISOString();
    this.status = order.status || 'Ordered';
    this.priority = order.priority || 'Routine';
    this.notes = order.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
