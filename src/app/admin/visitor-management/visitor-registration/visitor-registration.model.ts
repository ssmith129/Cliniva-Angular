export class Visitor {
  id: number;
  img: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  visitorAddress: string;
  visitorCity: string;
  visitorState: string;
  idProofType: string;
  idProofNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  numberOfVisitors: number;
  remarks: string;

  constructor(visitor: Partial<Visitor>) {
    this.id = visitor.id || this.getRandomID();
    this.img = visitor.img || 'assets/images/user/user1.jpg';
    this.visitorName = visitor.visitorName || '';
    this.visitorPhone = visitor.visitorPhone || '';
    this.visitorEmail = visitor.visitorEmail || '';
    this.visitorAddress = visitor.visitorAddress || '';
    this.visitorCity = visitor.visitorCity || '';
    this.visitorState = visitor.visitorState || '';
    this.idProofType = visitor.idProofType || '';
    this.idProofNumber = visitor.idProofNumber || '';
    this.vehicleNumber = visitor.vehicleNumber || '';
    this.vehicleType = visitor.vehicleType || '';
    this.numberOfVisitors = visitor.numberOfVisitors || 1;
    this.remarks = visitor.remarks || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
