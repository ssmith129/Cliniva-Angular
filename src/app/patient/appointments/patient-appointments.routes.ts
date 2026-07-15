import { Route } from '@angular/router';

export const PATIENT_APPOINTMENT_ROUTE: Route[] = [
  {
    path: 'book',
    loadComponent: () =>
      import('./book-appointment/book-appointment.component').then(
        (m) => m.BookAppointmentComponent
      ),
  },
  {
    path: 'today',
    loadComponent: () =>
      import('./today-appointment/today-appointment.component').then(
        (m) => m.TodayAppointmentComponent
      ),
  },
  {
    path: 'upcoming',
    loadComponent: () =>
      import('./upcoming-appointment/upcoming-appointment.component').then(
        (m) => m.UpcomingAppointmentComponent
      ),
  },
  {
    path: 'past',
    loadComponent: () =>
      import('./past-appointment/past-appointment.component').then(
        (m) => m.PastAppointmentComponent
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
