import { Route } from '@angular/router';

export const UI_ROUTE: Route[] = [
  {
    path: 'alerts',
    loadComponent: () =>
      import('./alerts/alerts.component').then((m) => m.AlertsComponent),
  },
  {
    path: 'badges',
    loadComponent: () =>
      import('./badge/badge.component').then((m) => m.BadgeComponent),
  },
  {
    path: 'chips',
    loadComponent: () =>
      import('./chips/chips.component').then((m) => m.ChipsComponent),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./buttons/buttons.component').then((m) => m.ButtonsComponent),
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./cards/cards.component').then((m) => m.CardsComponent),
  },
  {
    path: 'expansion-panel',
    loadComponent: () =>
      import('./expansion-panel/expansion-panel.component').then(
        (m) => m.ExpansionPanelComponent
      ),
  },
  {
    path: 'bottom-sheet',
    loadComponent: () =>
      import('./bottom-sheet/bottom-sheet.component').then(
        (m) => m.BottomSheetComponent
      ),
  },
  {
    path: 'dialogs',
    loadComponent: () =>
      import('./dialogs/dialogs.component').then((m) => m.DialogsComponent),
  },
  {
    path: 'labels',
    loadComponent: () =>
      import('./labels/labels.component').then((m) => m.LabelsComponent),
  },
  {
    path: 'list-group',
    loadComponent: () =>
      import('./list-group/list-group.component').then(
        (m) => m.ListGroupComponent
      ),
  },
  {
    path: 'modal',
    loadComponent: () =>
      import('./modal/modal.component').then((m) => m.ModalComponent),
  },
  {
    path: 'snackbar',
    loadComponent: () =>
      import('./snackbar/snackbar.component').then((m) => m.SnackbarComponent),
  },
  {
    path: 'preloaders',
    loadComponent: () =>
      import('./preloaders/preloaders.component').then(
        (m) => m.PreloadersComponent
      ),
  },
  {
    path: 'progressbars',
    loadComponent: () =>
      import('./progressbars/progressbars.component').then(
        (m) => m.ProgressbarsComponent
      ),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.component').then((m) => m.TabsComponent),
  },
  {
    path: 'typography',
    loadComponent: () =>
      import('./typography/typography.component').then(
        (m) => m.TypographyComponent
      ),
  },
  {
    path: 'helper-classes',
    loadComponent: () =>
      import('./helper-classes/helper-classes.component').then(
        (m) => m.HelperClassesComponent
      ),
  },
];
