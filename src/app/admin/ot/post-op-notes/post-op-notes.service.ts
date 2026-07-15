import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PostOpNote } from './post-op-notes.model';

@Injectable({
  providedIn: 'root',
})
export class PostOpNotesService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/post-op-notes.json';
  dataChange: BehaviorSubject<PostOpNote[]> = new BehaviorSubject<PostOpNote[]>([]);
  dialogData: PostOpNote | null = null;

  get data(): PostOpNote[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllPostOpNotes(): Observable<PostOpNote[]> {
    const mockData: PostOpNote[] = [
      new PostOpNote({
        id: 1,
        noteId: 'POST-001',
        patientName: 'Sarah Johnson',
        surgeryType: 'Appendectomy',
        noteDate: '2024-12-15',
        recordedBy: 'Dr. Williams',
        vitalSigns: 'BP: 118/76, HR: 70, Temp: 98.4°F, SpO2: 98%',
        painLevel: '3',
        recoveryStatus: 'Excellent',
        woundCondition: 'Clean and dry, no signs of infection',
        medicationsAdministered: 'Morphine 5mg IV, Ondansetron 4mg IV',
        complications: 'None',
        dietInstructions: 'Clear liquids, advance as tolerated',
        mobilityStatus: 'Walking with Assistance',
        dischargePlan: 'Discharge tomorrow if stable',
        notes: 'Patient recovering well',
      }),
      new PostOpNote({
        id: 2,
        noteId: 'POST-002',
        patientName: 'Michael Brown',
        surgeryType: 'Knee Replacement',
        noteDate: '2024-12-16',
        recordedBy: 'Dr. Davis',
        vitalSigns: 'BP: 135/85, HR: 75, Temp: 98.6°F, SpO2: 97%',
        painLevel: '6',
        recoveryStatus: 'Good',
        woundCondition: 'Surgical site clean, minimal drainage',
        medicationsAdministered: 'Oxycodone 10mg PO, Acetaminophen 1000mg PO',
        complications: 'Mild swelling',
        dietInstructions: 'Regular diet',
        mobilityStatus: 'Bed Rest',
        dischargePlan: 'Physical therapy starting tomorrow',
        notes: 'Pain management adequate',
      }),
      new PostOpNote({
        id: 3,
        noteId: 'POST-003',
        patientName: 'Emily Davis',
        surgeryType: 'Cataract Surgery',
        noteDate: '2024-12-15',
        recordedBy: 'Dr. Miller',
        vitalSigns: 'BP: 120/78, HR: 68, Temp: 98.2°F, SpO2: 99%',
        painLevel: '1',
        recoveryStatus: 'Excellent',
        woundCondition: 'Eye patch in place, no discharge',
        medicationsAdministered: 'Antibiotic eye drops',
        complications: 'None',
        dietInstructions: 'Normal diet',
        mobilityStatus: 'Independent',
        dischargePlan: 'Discharge today, follow-up in 1 week',
        notes: 'Vision improvement noted',
      }),
      new PostOpNote({
        id: 4,
        noteId: 'POST-004',
        patientName: 'David Wilson',
        surgeryType: 'Hernia Repair',
        noteDate: '2024-12-17',
        recordedBy: 'Dr. Anderson',
        vitalSigns: 'BP: 122/80, HR: 72, Temp: 98.5°F, SpO2: 98%',
        painLevel: '4',
        recoveryStatus: 'Good',
        woundCondition: 'Incision clean, steri-strips intact',
        medicationsAdministered: 'Ibuprofen 600mg PO',
        complications: 'None',
        dietInstructions: 'Soft diet',
        mobilityStatus: 'Walking with Assistance',
        dischargePlan: 'Discharge in 2 days',
        notes: 'Tolerating oral intake well',
      }),
      new PostOpNote({
        id: 5,
        noteId: 'POST-005',
        patientName: 'Jessica Martinez',
        surgeryType: 'Gallbladder Removal',
        noteDate: '2024-12-17',
        recordedBy: 'Dr. Moore',
        vitalSigns: 'BP: 125/82, HR: 74, Temp: 98.7°F, SpO2: 97%',
        painLevel: '5',
        recoveryStatus: 'Good',
        woundCondition: 'Laparoscopic sites clean',
        medicationsAdministered: 'Tramadol 50mg PO, Zofran 4mg IV',
        complications: 'Mild nausea',
        dietInstructions: 'Clear liquids only',
        mobilityStatus: 'Limited Mobility',
        dischargePlan: 'Discharge tomorrow if tolerating diet',
        notes: 'Nausea controlled with medication',
      }),
      new PostOpNote({
        id: 6,
        noteId: 'POST-006',
        patientName: 'James Anderson',
        surgeryType: 'Hip Replacement',
        noteDate: '2024-12-18',
        recordedBy: 'Dr. White',
        vitalSigns: 'BP: 140/88, HR: 78, Temp: 98.8°F, SpO2: 96%',
        painLevel: '7',
        recoveryStatus: 'Fair',
        woundCondition: 'Surgical site intact, moderate drainage',
        medicationsAdministered: 'Morphine PCA, Ketorolac 30mg IV',
        complications: 'Elevated BP',
        dietInstructions: 'Regular diet',
        mobilityStatus: 'Bed Rest',
        dischargePlan: 'Extended stay for PT, monitor BP',
        notes: 'Pain control challenging',
      }),
      new PostOpNote({
        id: 7,
        noteId: 'POST-007',
        patientName: 'Linda Taylor',
        surgeryType: 'Thyroidectomy',
        noteDate: '2024-12-14',
        recordedBy: 'Dr. Harris',
        vitalSigns: 'BP: 118/74, HR: 66, Temp: 98.3°F, SpO2: 99%',
        painLevel: '2',
        recoveryStatus: 'Excellent',
        woundCondition: 'Neck incision clean, no hematoma',
        medicationsAdministered: 'Acetaminophen 650mg PO',
        complications: 'None',
        dietInstructions: 'Soft foods',
        mobilityStatus: 'Independent',
        dischargePlan: 'Discharge today',
        notes: 'Calcium levels normal',
      }),
      new PostOpNote({
        id: 8,
        noteId: 'POST-008',
        patientName: 'Robert Thomas',
        surgeryType: 'Cardiac Bypass',
        noteDate: '2024-12-19',
        recordedBy: 'Dr. Garcia',
        vitalSigns: 'BP: 130/82, HR: 72, Temp: 98.5°F, SpO2: 95%',
        painLevel: '8',
        recoveryStatus: 'Fair',
        woundCondition: 'Sternotomy incision intact, chest tubes in place',
        medicationsAdministered: 'Morphine PCA, Aspirin, Plavix',
        complications: 'Atrial fibrillation',
        dietInstructions: 'Cardiac diet',
        mobilityStatus: 'Bed Rest',
        dischargePlan: 'ICU for 2-3 days',
        notes: 'Hemodynamically stable, rhythm controlled',
      }),
      new PostOpNote({
        id: 9,
        noteId: 'POST-009',
        patientName: 'Patricia Jackson',
        surgeryType: 'Tonsillectomy',
        noteDate: '2024-12-13',
        recordedBy: 'Dr. Lee',
        vitalSigns: 'BP: 125/78, HR: 70, Temp: 98.4°F, SpO2: 98%',
        painLevel: '6',
        recoveryStatus: 'Good',
        woundCondition: 'Tonsillar beds healing well',
        medicationsAdministered: 'Acetaminophen with Codeine',
        complications: 'Mild bleeding',
        dietInstructions: 'Cold, soft foods',
        mobilityStatus: 'Independent',
        dischargePlan: 'Discharge today',
        notes: 'Bleeding controlled',
      }),
      new PostOpNote({
        id: 10,
        noteId: 'POST-010',
        patientName: 'Christopher White',
        surgeryType: 'Spinal Fusion',
        noteDate: '2024-12-20',
        recordedBy: 'Dr. Lewis',
        vitalSigns: 'BP: 128/80, HR: 74, Temp: 98.6°F, SpO2: 97%',
        painLevel: '7',
        recoveryStatus: 'Good',
        woundCondition: 'Spinal incision clean, drain in place',
        medicationsAdministered: 'Dilaudid PCA, Muscle relaxants',
        complications: 'None',
        dietInstructions: 'Regular diet',
        mobilityStatus: 'Bed Rest',
        dischargePlan: 'Rehab facility in 5-7 days',
        notes: 'Neurological status intact',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addPostOpNote(note: PostOpNote): Observable<PostOpNote> {
    this.dialogData = note;
    return of(note);
  }

  updatePostOpNote(note: PostOpNote): Observable<PostOpNote> {
    this.dialogData = note;
    return of(note);
  }

  deletePostOpNote(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
