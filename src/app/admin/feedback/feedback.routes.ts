import { Route } from '@angular/router';

export const FEEDBACK_ROUTE: Route[] = [
  {
    path: 'patient-feedback',
    loadComponent: () =>
      import('./patient-feedback/patient-feedback.component').then(
        (m) => m.PatientFeedbackComponent
      ),
  },
  {
    path: 'complaint-resolution',
    loadComponent: () =>
      import('./complaint-resolution/complaint-resolution.component').then(
        (m) => m.ComplaintResolutionComponent
      ),
  },
];
