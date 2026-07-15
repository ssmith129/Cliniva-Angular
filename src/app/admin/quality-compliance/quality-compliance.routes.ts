import { Route } from '@angular/router';

export const QUALITY_COMPLIANCE_ROUTE: Route[] = [
  {
    path: 'audit-checklist',
    loadComponent: () =>
      import('./audit-checklist/audit-checklist.component').then(
        (m) => m.AuditChecklistComponent
      ),
  },
  {
    path: 'compliance-documents',
    loadComponent: () =>
      import('./compliance-documents/compliance-documents.component').then(
        (m) => m.ComplianceDocumentsComponent
      ),
  },
];
