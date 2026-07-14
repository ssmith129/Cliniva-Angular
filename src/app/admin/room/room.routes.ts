import { Route } from '@angular/router';

export const ROOMS_ROUTE: Route[] = [
  {
    path: 'all-rooms',
    loadComponent: () =>
      import('./allroom/allroom.component').then((m) => m.AllroomComponent),
  },
  {
    path: 'add-allotment',
    loadComponent: () =>
      import('./add-allotment/add-allotment.component').then(
        (m) => m.AddAllotmentComponent
      ),
  },
  {
    path: 'edit-allotment',
    loadComponent: () =>
      import('./edit-allotment/edit-allotment.component').then(
        (m) => m.EditAllotmentComponent
      ),
  },
  {
    path: 'rooms-by-department',
    loadComponent: () =>
      import('./rooms-by-department/rooms-by-department.component').then(
        (m) => m.RoomsByDepartmentComponent
      ),
  },
  {
    path: 'add-room',
    loadComponent: () =>
      import('./add-room/add-room.component').then((m) => m.AddRoomComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
