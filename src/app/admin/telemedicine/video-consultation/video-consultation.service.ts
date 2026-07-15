import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { VideoConsultation } from './video-consultation.model';

@Injectable({
  providedIn: 'root',
})
export class VideoConsultationService {
  private httpClient = inject(HttpClient);

  dataChange: BehaviorSubject<VideoConsultation[]> = new BehaviorSubject<VideoConsultation[]>([]);
  dialogData: VideoConsultation | null = null;

  get data(): VideoConsultation[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllConsultations(): Observable<VideoConsultation[]> {
    const mockData: VideoConsultation[] = [
      new VideoConsultation({
        id: 1,
        consultation_id: 'VC-001',
        patient_name: 'Sarah Johnson',
        doctor_name: 'Dr. John Deo',
        scheduled_date: '2024-12-15',
        scheduled_time: '10:00 AM',
        duration: '30',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/abc-defg-hij',
        notes: 'Follow-up for diabetes.',
      }),
      new VideoConsultation({
        id: 2,
        consultation_id: 'VC-002',
        patient_name: 'Michael Brown',
        doctor_name: 'Dr. Sarah Smith',
        scheduled_date: '2024-12-15',
        scheduled_time: '11:00 AM',
        duration: '15',
        status: 'In Progress',
        meeting_link: 'https://meet.google.com/klm-nopq-rst',
        notes: 'General checkup.',
      }),
      new VideoConsultation({
        id: 3,
        consultation_id: 'VC-003',
        patient_name: 'Emily Davis',
        doctor_name: 'Dr. Rajesh Kumar',
        scheduled_date: '2024-12-16',
        scheduled_time: '09:00 AM',
        duration: '45',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/uvw-xyz-123',
        notes: 'Cardiology consultation.',
      }),
      new VideoConsultation({
        id: 4,
        consultation_id: 'VC-004',
        patient_name: 'David Wilson',
        doctor_name: 'Dr. John Deo',
        scheduled_date: '2024-12-14',
        scheduled_time: '02:00 PM',
        duration: '30',
        status: 'Completed',
        meeting_link: 'https://meet.google.com/456-789-0ab',
        notes: 'Prescription renewed.',
      }),
      new VideoConsultation({
        id: 5,
        consultation_id: 'VC-005',
        patient_name: 'Jessica Martinez',
        doctor_name: 'Dr. Sarah Smith',
        scheduled_date: '2024-12-14',
        scheduled_time: '04:00 PM',
        duration: '20',
        status: 'Cancelled',
        meeting_link: '',
        notes: 'Patient requested cancellation.',
      }),
      new VideoConsultation({
        id: 6,
        consultation_id: 'VC-006',
        patient_name: 'James Anderson',
        doctor_name: 'Dr. Rajesh Kumar',
        scheduled_date: '2024-12-17',
        scheduled_time: '11:30 AM',
        duration: '30',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/cde-fgh-ijk',
        notes: 'Lab reports review.',
      }),
      new VideoConsultation({
        id: 7,
        consultation_id: 'VC-007',
        patient_name: 'Linda Taylor',
        doctor_name: 'Dr. John Deo',
        scheduled_date: '2024-12-17',
        scheduled_time: '03:00 PM',
        duration: '30',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/lmn-opq-rst',
        notes: '',
      }),
      new VideoConsultation({
        id: 8,
        consultation_id: 'VC-008',
        patient_name: 'Robert Thomas',
        doctor_name: 'Dr. Sarah Smith',
        scheduled_date: '2024-12-18',
        scheduled_time: '10:00 AM',
        duration: '60',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/uvw-xyz-abc',
        notes: 'Psychiatry session.',
      }),
      new VideoConsultation({
        id: 9,
        consultation_id: 'VC-009',
        patient_name: 'Patricia Jackson',
        doctor_name: 'Dr. Rajesh Kumar',
        scheduled_date: '2024-12-13',
        scheduled_time: '05:00 PM',
        duration: '15',
        status: 'Completed',
        meeting_link: 'https://meet.google.com/def-ghi-jkl',
        notes: 'Dermatology consultation.',
      }),
      new VideoConsultation({
        id: 10,
        consultation_id: 'VC-010',
        patient_name: 'Christopher White',
        doctor_name: 'Dr. John Deo',
        scheduled_date: '2024-12-19',
        scheduled_time: '09:30 AM',
        duration: '30',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/mno-pqr-stu',
        notes: '',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addVideoConsultation(consultation: VideoConsultation): Observable<VideoConsultation> {
    this.dialogData = consultation;
    return of(consultation);
  }

  updateVideoConsultation(consultation: VideoConsultation): Observable<VideoConsultation> {
    this.dialogData = consultation;
    return of(consultation);
  }

  deleteVideoConsultation(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
