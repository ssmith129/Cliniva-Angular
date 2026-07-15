import { Route } from '@angular/router';

export const FORMS_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'form-controls',
    pathMatch: 'full',
  },
  {
    path: 'form-controls',
    loadComponent: () =>
      import('./form-controls/form-controls.component').then(
        (m) => m.FormControlsComponent
      ),
  },
  {
    path: 'advance-controls',
    loadComponent: () =>
      import('./advance-controls/advance-controls.component').then(
        (m) => m.AdvanceControlsComponent
      ),
  },
  {
    path: 'form-example',
    loadComponent: () =>
      import('./form-examples/form-examples.component').then(
        (m) => m.FormExamplesComponent
      ),
  },
  {
    path: 'form-validation',
    loadComponent: () =>
      import('./form-validations/form-validations.component').then(
        (m) => m.FormValidationsComponent
      ),
  },
  {
    path: 'wizard',
    loadComponent: () =>
      import('./wizard/wizard.component').then((m) => m.WizardComponent),
  },
  {
    path: 'editors',
    loadComponent: () =>
      import('./editors/editors.component').then((m) => m.EditorsComponent),
  },
];
