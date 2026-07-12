import { Route } from '@angular/router';

export const DOCUMENTS_CONSENT_ROUTE: Route[] = [
  {
    path: 'upload-documents',
    loadComponent: () =>
      import('./upload-documents/upload-documents.component').then(
        (m) => m.UploadDocumentsComponent
      ),
  },
  {
    path: 'consent-templates',
    loadComponent: () =>
      import('./consent-templates/consent-templates.component').then(
        (m) => m.ConsentTemplatesComponent
      ),
  },
  {
    path: 'signed-consent',
    loadComponent: () =>
      import('./signed-consent/signed-consent.component').then(
        (m) => m.SignedConsentComponent
      ),
  },
];
