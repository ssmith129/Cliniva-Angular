import { Route } from '@angular/router';

export const SETTINGS_ROUTE: Route[] = [
  {
    path: 'general',
    loadComponent: () =>
      import('./general-settings/general-settings.component').then(
        (m) => m.GeneralSettingsComponent
      ),
  },
  {
    path: 'users-roles',
    loadComponent: () =>
      import('./users-roles-settings/users-roles-settings.component').then(
        (m) => m.UsersRolesSettingsComponent
      ),
  },
  {
    path: 'operations',
    loadComponent: () =>
      import('./operations-settings/operations-settings.component').then(
        (m) => m.OperationsSettingsComponent
      ),
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./billing-settings/billing-settings.component').then(
        (m) => m.BillingSettingsComponent
      ),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notification-settings/notification-settings.component').then(
        (m) => m.NotificationSettingsComponent
      ),
  },
  {
    path: 'ai-settings',
    loadComponent: () =>
      import('./ai-settings/ai-settings.component').then(
        (m) => m.AiSettingsComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('app/authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
