export class DischargeWorkflow {
  id: number;
  workflowId: string;
  patientName: string;
  patientImg: string;
  admissionDate: string;
  expectedDischargeDate: string;
  dischargeType: string;
  approvalStatus: string;
  pendingDepartment: string;
  finalizedBy: string;
  notes: string;

  constructor(workflow: Partial<DischargeWorkflow>) {
    this.id = workflow.id || this.getRandomID();
    this.workflowId = workflow.workflowId || '';
    this.patientName = workflow.patientName || '';
    this.patientImg = workflow.patientImg || 'assets/images/user/user1.jpg';
    this.admissionDate = workflow.admissionDate || new Date().toISOString();
    this.expectedDischargeDate = workflow.expectedDischargeDate || new Date().toISOString();
    this.dischargeType = workflow.dischargeType || '';
    this.approvalStatus = workflow.approvalStatus || 'Pending';
    this.pendingDepartment = workflow.pendingDepartment || '';
    this.finalizedBy = workflow.finalizedBy || '';
    this.notes = workflow.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
