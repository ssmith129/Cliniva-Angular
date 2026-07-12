import { Route } from '@angular/router';

export const APPOINTMENT_ROUTE: Route[] = [
  {
    path: 'appointment-calendar',
    loadComponent: () =>
      import(
        './appointment-calendar/appointment-calendar.component'
      ).then((m) => m.AppointmentCalendarComponent),
  },
  {
    path: 'bookAppointment',
    loadComponent: () =>
      import('./bookappointment/bookappointment.component').then(
        (m) => m.BookappointmentComponent
      ),
  },
  {
    path: 'viewAppointment',
    loadComponent: () =>
      import('./viewappointment/viewappointment.component').then(
        (m) => m.ViewappointmentComponent
      ),
  },
  {
    path: 'edit-ppointment',
    loadComponent: () =>
      import('./editappointment/editappointment.component').then(
        (m) => m.EditappointmentComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
