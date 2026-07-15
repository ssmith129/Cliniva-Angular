import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PreOpAssessment } from './pre-op-assessment.model';

@Injectable({
  providedIn: 'root',
})
export class PreOpAssessmentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/pre-op-assessment.json';
  dataChange: BehaviorSubject<PreOpAssessment[]> = new BehaviorSubject<PreOpAssessment[]>([]);
  dialogData: PreOpAssessment | null = null;

  get data(): PreOpAssessment[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllPreOpAssessments(): Observable<PreOpAssessment[]> {
    const mockData: PreOpAssessment[] = [
      new PreOpAssessment({
        id: 1,
        assessmentId: 'PRE-001',
        patientName: 'Sarah Johnson',
        surgeryType: 'Appendectomy',
        assessmentDate: '2024-12-15',
        assessedBy: 'Dr. Williams',
        vitalSigns: 'BP: 120/80, HR: 72, Temp: 98.6°F',
        medicalHistory: 'No significant medical history',
        currentMedications: 'None',
        allergies: 'None',
        fitnessStatus: 'Fit',
        riskLevel: 'Low',
        recommendations: 'Patient cleared for surgery',
        notes: 'All pre-op tests normal',
      }),
      new PreOpAssessment({
        id: 2,
        assessmentId: 'PRE-002',
        patientName: 'Michael Brown',
        surgeryType: 'Knee Replacement',
        assessmentDate: '2024-12-15',
        assessedBy: 'Dr. Davis',
        vitalSigns: 'BP: 140/90, HR: 78, Temp: 98.4°F',
        medicalHistory: 'Hypertension, controlled',
        currentMedications: 'Lisinopril 10mg',
        allergies: 'Penicillin',
        fitnessStatus: 'Conditionally Fit',
        riskLevel: 'Medium',
        recommendations: 'Monitor BP closely during surgery',
        notes: 'Patient on blood pressure medication',
      }),
      new PreOpAssessment({
        id: 3,
        assessmentId: 'PRE-003',
        patientName: 'Emily Davis',
        surgeryType: 'Cataract Surgery',
        assessmentDate: '2024-12-14',
        assessedBy: 'Dr. Miller',
        vitalSigns: 'BP: 118/75, HR: 68, Temp: 98.2°F',
        medicalHistory: 'Diabetes Type 2',
        currentMedications: 'Metformin 500mg',
        allergies: 'None',
        fitnessStatus: 'Fit',
        riskLevel: 'Low',
        recommendations: 'Continue diabetes medication',
        notes: 'Blood sugar levels stable',
      }),
      new PreOpAssessment({
        id: 4,
        assessmentId: 'PRE-004',
        patientName: 'David Wilson',
        surgeryType: 'Hernia Repair',
        assessmentDate: '2024-12-16',
        assessedBy: 'Dr. Anderson',
        vitalSigns: 'BP: 125/82, HR: 74, Temp: 98.5°F',
        medicalHistory: 'Previous hernia surgery 5 years ago',
        currentMedications: 'None',
        allergies: 'Latex',
        fitnessStatus: 'Fit',
        riskLevel: 'Low',
        recommendations: 'Use latex-free equipment',
        notes: 'Patient aware of latex allergy precautions',
      }),
      new PreOpAssessment({
        id: 5,
        assessmentId: 'PRE-005',
        patientName: 'Jessica Martinez',
        surgeryType: 'Gallbladder Removal',
        assessmentDate: '2024-12-16',
        assessedBy: 'Dr. Moore',
        vitalSigns: 'BP: 122/78, HR: 70, Temp: 98.3°F',
        medicalHistory: 'Asthma, well-controlled',
        currentMedications: 'Albuterol inhaler',
        allergies: 'Sulfa drugs',
        fitnessStatus: 'Fit',
        riskLevel: 'Low',
        recommendations: 'Have inhaler available',
        notes: 'Respiratory function normal',
      }),
      new PreOpAssessment({
        id: 6,
        assessmentId: 'PRE-006',
        patientName: 'James Anderson',
        surgeryType: 'Hip Replacement',
        assessmentDate: '2024-12-17',
        assessedBy: 'Dr. White',
        vitalSigns: 'BP: 150/95, HR: 82, Temp: 98.7°F',
        medicalHistory: 'Hypertension, COPD',
        currentMedications: 'Lisinopril, Spiriva',
        allergies: 'None',
        fitnessStatus: 'Conditionally Fit',
        riskLevel: 'High',
        recommendations: 'Cardiology clearance required',
        notes: 'Awaiting cardiology consultation',
      }),
      new PreOpAssessment({
        id: 7,
        assessmentId: 'PRE-007',
        patientName: 'Linda Taylor',
        surgeryType: 'Thyroidectomy',
        assessmentDate: '2024-12-13',
        assessedBy: 'Dr. Harris',
        vitalSigns: 'BP: 115/72, HR: 66, Temp: 98.1°F',
        medicalHistory: 'Hyperthyroidism',
        currentMedications: 'Methimazole',
        allergies: 'None',
        fitnessStatus: 'Fit',
        riskLevel: 'Low',
        recommendations: 'Thyroid levels within normal range',
        notes: 'Ready for surgery',
      }),
      new PreOpAssessment({
        id: 8,
        assessmentId: 'PRE-008',
        patientName: 'Robert Thomas',
        surgeryType: 'Cardiac Bypass',
        assessmentDate: '2024-12-18',
        assessedBy: 'Dr. Garcia',
        vitalSigns: 'BP: 135/88, HR: 76, Temp: 98.4°F',
        medicalHistory: 'CAD, previous MI',
        currentMedications: 'Aspirin, Atorvastatin, Metoprolol',
        allergies: 'None',
        fitnessStatus: 'Conditionally Fit',
        riskLevel: 'High',
        recommendations: 'High-risk surgery, ICU bed reserved',
        notes: 'Full cardiac workup completed',
      }),
      new PreOpAssessment({
        id: 9,
        assessmentId: 'PRE-009',
        patientName: 'Patricia Jackson',
        surgeryType: 'Tonsillectomy',
        assessmentDate: '2024-12-12',
        assessedBy: 'Dr. Lee',
        vitalSigns: 'BP: 128/80, HR: 75, Temp: 99.2°F',
        medicalHistory: 'Recurrent tonsillitis',
        currentMedications: 'None',
        allergies: 'None',
        fitnessStatus: 'Not Fit',
        riskLevel: 'Medium',
        recommendations: 'Defer surgery due to fever',
        notes: 'Surgery postponed, patient has fever',
      }),
      new PreOpAssessment({
        id: 10,
        assessmentId: 'PRE-010',
        patientName: 'Christopher White',
        surgeryType: 'Spinal Fusion',
        assessmentDate: '2024-12-19',
        assessedBy: 'Dr. Lewis',
        vitalSigns: 'BP: 120/78, HR: 70, Temp: 98.3°F',
        medicalHistory: 'Chronic back pain',
        currentMedications: 'Ibuprofen, Gabapentin',
        allergies: 'None',
        fitnessStatus: 'Fit',
        riskLevel: 'Medium',
        recommendations: 'Complex procedure, extended OR time',
        notes: 'All imaging studies reviewed',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addPreOpAssessment(assessment: PreOpAssessment): Observable<PreOpAssessment> {
    this.dialogData = assessment;
    return of(assessment);
  }

  updatePreOpAssessment(assessment: PreOpAssessment): Observable<PreOpAssessment> {
    this.dialogData = assessment;
    return of(assessment);
  }

  deletePreOpAssessment(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
