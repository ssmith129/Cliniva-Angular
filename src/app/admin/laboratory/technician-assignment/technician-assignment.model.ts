export class TechnicianAssignment {
  id: number;
  technicianName: string;
  technicianImg: string;
  testName: string;
  patientName: string;
  assignedDate: string;
  priority: string;
  status: string;
  department: string;

  constructor(technicianAssignment: Partial<TechnicianAssignment>) {
    this.id = technicianAssignment.id || this.getRandomID();
    this.technicianName = technicianAssignment.technicianName || '';
    this.technicianImg = technicianAssignment.technicianImg || 'assets/images/user/user1.jpg';
    this.testName = technicianAssignment.testName || '';
    this.patientName = technicianAssignment.patientName || '';
    this.assignedDate = technicianAssignment.assignedDate || new Date().toISOString();
    this.priority = technicianAssignment.priority || 'Normal';
    this.status = technicianAssignment.status || 'Assigned';
    this.department = technicianAssignment.department || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}