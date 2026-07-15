export class ConsentTemplate {
  id: number;
  template_id: string;
  template_name: string;
  category: string;
  department: string;
  version: string;
  created_date: string;
  created_by: string;
  last_updated: string;
  status: string;
  template_content: string;
  notes: string;

  constructor(template: Partial<ConsentTemplate>) {
    this.id = template.id || this.getRandomID();
    this.template_id = template.template_id || '';
    this.template_name = template.template_name || '';
    this.category = template.category || '';
    this.department = template.department || '';
    this.version = template.version || '1.0';
    this.created_date = template.created_date || new Date().toISOString();
    this.created_by = template.created_by || '';
    this.last_updated = template.last_updated || new Date().toISOString();
    this.status = template.status || 'Draft';
    this.template_content = template.template_content || '';
    this.notes = template.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
