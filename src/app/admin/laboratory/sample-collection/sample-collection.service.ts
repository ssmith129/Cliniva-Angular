import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SampleCollection } from './sample-collection.model';

@Injectable({
  providedIn: 'root',
})
export class SampleCollectionService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/sample-collection.json';
  dataChange: BehaviorSubject<SampleCollection[]> = new BehaviorSubject<
    SampleCollection[]
  >([]);
  dialogData: SampleCollection | null = null;

  get data(): SampleCollection[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSampleCollections(): Observable<SampleCollection[]> {
    const mockData: SampleCollection[] = [
      new SampleCollection({
        id: 1,
        sampleId: 'SAM-2001',
        patientName: 'John Doe',
        testName: 'CBC',
        sampleType: 'Blood',
        collectionDate: '2025-12-10T09:30:00',
        collectedBy: 'Nurse Alice',
        status: 'Transferred',
      }),
      new SampleCollection({
        id: 2,
        sampleId: 'SAM-2002',
        patientName: 'Jane Roe',
        testName: 'Urine Routine',
        sampleType: 'Urine',
        collectionDate: '2025-12-11T08:00:00',
        collectedBy: 'Tech Bob',
        status: 'Pending',
      }),
      new SampleCollection({
        id: 3,
        sampleId: 'SAM-2003',
        patientName: 'Peter Pan',
        testName: 'Lipid Panel',
        sampleType: 'Blood',
        collectionDate: '2025-12-12T10:00:00',
        collectedBy: 'Nurse Alice',
        status: 'Transferred',
      }),
      new SampleCollection({
        id: 4,
        sampleId: 'SAM-2004',
        patientName: 'Wendy Darling',
        testName: 'Thyroid Stimulating Hormone (TSH)',
        sampleType: 'Blood',
        collectionDate: '2025-12-13T11:30:00',
        collectedBy: 'Tech Bob',
        status: 'Pending',
      }),
      new SampleCollection({
        id: 5,
        sampleId: 'SAM-2005',
        patientName: 'Captain Hook',
        testName: 'Glucose Test',
        sampleType: 'Blood',
        collectionDate: '2025-12-14T14:00:00',
        collectedBy: 'Nurse Alice',
        status: 'Collected',
      }),
      new SampleCollection({
        id: 6,
        sampleId: 'SAM-2006',
        patientName: 'Smee',
        testName: 'Prostate Specific Antigen (PSA)',
        sampleType: 'Blood',
        collectionDate: '2025-12-15T09:00:00',
        collectedBy: 'Tech Bob',
        status: 'Pending',
      }),
      new SampleCollection({
        id: 7,
        sampleId: 'SAM-2007',
        patientName: 'Tiger Lily',
        testName: 'C-Reactive Protein (CRP)',
        sampleType: 'Blood',
        collectionDate: '2025-12-16T10:30:00',
        collectedBy: 'Nurse Alice',
        status: 'Collected',
      }),
      new SampleCollection({
        id: 8,
        sampleId: 'SAM-2008',
        patientName: 'Mr. Smee',
        testName: 'Vitamin D',
        sampleType: 'Blood',
        collectionDate: '2025-12-17T13:00:00',
        collectedBy: 'Tech Bob',
        status: 'Pending',
      }),
      new SampleCollection({
        id: 9,
        sampleId: 'SAM-2009',
        patientName: 'Tinker Bell',
        testName: 'Iron Studies',
        sampleType: 'Blood',
        collectionDate: '2025-12-18T08:45:00',
        collectedBy: 'Nurse Alice',
        status: 'Transferred',
      }),
      new SampleCollection({
        id: 10,
        sampleId: 'SAM-2010',
        patientName: 'Crocodile',
        testName: 'Kidney Function Test',
        sampleType: 'Blood',
        collectionDate: '2025-12-19T11:00:00',
        collectedBy: 'Tech Bob',
        status: 'Pending',
      }),
    ];
    return of(mockData).pipe(catchError(this.handleError));
  }

  addSampleCollection(
    sampleCollection: SampleCollection
  ): Observable<SampleCollection> {
    this.dialogData = sampleCollection;
    return of(sampleCollection);
  }

  updateSampleCollection(
    sampleCollection: SampleCollection
  ): Observable<SampleCollection> {
    this.dialogData = sampleCollection;
    return of(sampleCollection);
  }

  deleteSampleCollection(id: number): Observable<number> {
    return of(id);
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
