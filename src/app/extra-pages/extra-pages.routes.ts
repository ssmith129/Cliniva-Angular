import { Route } from '@angular/router';

export const EXTRA_PAGES_ROUTE: Route[] = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pricing/pricing.component').then((m) => m.PricingComponent),
  },
  {
    path: 'invoice',
    loadComponent: () =>
      import('./invoice/invoice.component').then((m) => m.InvoiceComponent),
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./faqs/faqs.component').then((m) => m.FaqsComponent),
  },
  {
    path: 'blank',
    loadComponent: () =>
      import('./blank/blank.component').then((m) => m.BlankComponent),
  },
  {
    path: 'knowledge-base',
    loadComponent: () =>
      import('./knowledge-base/knowledge-base.component').then(
        (m) => m.KnowledgeBaseComponent
      ),
  },
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('./terms-conditions/terms-conditions.component').then(
        (m) => m.TermsConditionsComponent
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },
];
