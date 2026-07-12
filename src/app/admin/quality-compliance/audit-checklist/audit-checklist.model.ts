export class AuditChecklist {
  id: number;
  audit_id: string;
  audit_type: string;
  department: string;
  audit_date: string;
  auditor_name: string;
  auditor_organization: string;
  compliance_score: string;
  total_items: string;
  items_passed: string;
  items_failed: string;
  status: string;
  findings: string;
  recommendations: string;
  follow_up_date: string;
  notes: string;

  constructor(audit: Partial<AuditChecklist>) {
    this.id = audit.id || this.getRandomID();
    this.audit_id = audit.audit_id || '';
    this.audit_type = audit.audit_type || '';
    this.department = audit.department || '';
    this.audit_date = audit.audit_date || new Date().toISOString();
    this.auditor_name = audit.auditor_name || '';
    this.auditor_organization = audit.auditor_organization || '';
    this.compliance_score = audit.compliance_score || '';
    this.total_items = audit.total_items || '';
    this.items_passed = audit.items_passed || '';
    this.items_failed = audit.items_failed || '';
    this.status = audit.status || 'Scheduled';
    this.findings = audit.findings || '';
    this.recommendations = audit.recommendations || '';
    this.follow_up_date = audit.follow_up_date || '';
    this.notes = audit.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
