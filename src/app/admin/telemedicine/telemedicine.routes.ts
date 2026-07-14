import { Route } from '@angular/router';

export const TELEMEDICINE_ROUTE: Route[] = [
  {
    path: 'video-consultation',
    loadComponent: () =>
      import('./video-consultation/video-consultation.component').then(
        (m) => m.VideoConsultationComponent
      ),
  },
  {
    path: 'virtual-visit-records',
    loadComponent: () =>
      import('./virtual-visit-records/virtual-visit-records.component').then(
        (m) => m.VirtualVisitRecordsComponent
      ),
  },
  {
    path: 'waiting-room',
    loadComponent: () =>
      import('./waiting-room/waiting-room.component').then(
        (m) => m.WaitingRoomComponent
      ),
  },
  {
    path: 'call-interface',
    loadComponent: () =>
      import('./call-interface/call-interface.component').then(
        (m) => m.CallInterfaceComponent
      ),
  },
  {
    path: 'consultation-schedule',
    loadComponent: () =>
      import('./consultation-schedule/consultation-schedule.component').then(
        (m) => m.ConsultationScheduleComponent
      ),
  },
  {
    path: 'post-consultation-notes',
    loadComponent: () =>
      import('./post-consultation-notes/post-consultation-notes.component').then(
        (m) => m.PostConsultationNotesComponent
      ),
  },
  {
    path: 'telemedicine-analytics',
    loadComponent: () =>
      import('./telemedicine-analytics/telemedicine-analytics.component').then(
        (m) => m.TelemedicineAnalyticsComponent
      ),
  },
];
