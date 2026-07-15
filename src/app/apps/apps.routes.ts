import { Route } from '@angular/router';

export const APPS_ROUTE: Route[] = [
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'contact-grid',
    loadComponent: () => import('./contact-grid/contact-grid.component').then((m) => m.ContactGridComponent),
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then((m) => m.SupportComponent),
  },
  {
    path: 'dragdrop',
    loadComponent: () => import('./drag-drop/drag-drop.component').then((m) => m.DragDropComponent),
  },
  {
    path: 'kanban',
    loadComponent: () => import('./kanban/kanban.component').then((m) => m.KanbanComponent),
  },
  {
    path: 'file-manager',
    loadComponent: () => import('./file-manager/file-manager.component').then((m) => m.FileManagerComponent),
  },
  {
    path: 'notification-center',
    loadComponent: () => import('./notification-center/notification-center.component').then((m) => m.NotificationCenterComponent),
  },
  {
    path: '**',
    loadComponent: () => import('../authentication/page404/page404.component').then((m) => m.Page404Component),
  },
];
