import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TestCatalog } from './test-catalog.model';

@Injectable({
  providedIn: 'root',
})
export class TestCatalogService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'assets/data/test-catalog.json';
  dataChange: BehaviorSubject<TestCatalog[]> = new BehaviorSubject<
    TestCatalog[]
  >([]);
  // Temporarily store data in memory for demo purposes
  dialogData: TestCatalog | null = null;

  get data(): TestCatalog[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** GET: Fetch all test catalog items */
  getAllTestCatalogs(): Observable<TestCatalog[]> {
    // For now, returning mock data directly as observable since we don't have the JSON yet
    const mockData: TestCatalog[] = [
      new TestCatalog({
        id: 1,
        code: 'HEM001',
        testName: 'Complete Blood Count (CBC)',
        category: 'Hematology',
        department: 'Clinical Lab',
        sampleType: 'Blood',
        price: 50,
        duration: '24 Hours',
        status: 'Active',
        description:
          'A blood test used to evaluate your overall health and detect a wide range of disorders.',
      }),
      new TestCatalog({
        id: 2,
        code: 'BIO001',
        testName: 'Liver Function Test',
        category: 'Biochemistry',
        department: 'Clinical Lab',
        sampleType: 'Blood',
        price: 120,
        duration: '24 Hours',
        status: 'Inactive',
        description:
          'A group of tests that assess liver function and detect liver diseases.',
      }),
      new TestCatalog({
        id: 3,
        code: 'IMM001',
        testName: 'Thyroid Stimulating Hormone (TSH)',
        category: 'Immunology',
        department: 'Endocrinology',
        sampleType: 'Blood',
        price: 80,
        duration: '48 Hours',
        status: 'Active',
        description: 'Measures TSH levels to screen for thyroid disorders.',
      }),
      new TestCatalog({
        id: 4,
        code: 'MIC001',
        testName: 'Urine Culture',
        category: 'Microbiology',
        department: 'Pathology',
        sampleType: 'Urine',
        price: 70,
        duration: '72 Hours',
        status: 'Active',
        description:
          'Detects and identifies bacteria in urine that may cause urinary tract infections.',
      }),
      new TestCatalog({
        id: 5,
        code: 'CAR001',
        testName: 'Lipid Panel',
        category: 'Cardiology',
        department: 'Clinical Lab',
        sampleType: 'Blood',
        price: 90,
        duration: '24 Hours',
        status: 'Inactive',
        description:
          'Measures cholesterol and triglyceride levels to assess cardiovascular risk.',
      }),
      new TestCatalog({
        id: 6,
        code: 'HEM002',
        testName: 'Hemoglobin A1c',
        category: 'Hematology',
        department: 'Clinical Lab',
        sampleType: 'Blood',
        price: 60,
        duration: '24 Hours',
        status: 'Inactive',
        description:
          'Measures average blood sugar levels over the past 2-3 months, used for diabetes diagnosis and management.',
      }),
      new TestCatalog({
        id: 7,
        code: 'BIO002',
        testName: 'Kidney Function Test',
        category: 'Biochemistry',
        department: 'Clinical Lab',
        sampleType: 'Blood, Urine',
        price: 110,
        duration: '24 Hours',
        status: 'Inactive',
        description:
          'Evaluates kidney health by measuring creatinine, BUN, and other markers.',
      }),
      new TestCatalog({
        id: 8,
        code: 'IMM002',
        testName: 'Vitamin D (25-Hydroxy)',
        category: 'Immunology',
        department: 'Endocrinology',
        sampleType: 'Blood',
        price: 100,
        duration: '48 Hours',
        status: 'Active',
        description:
          'Measures vitamin D levels to detect deficiency or toxicity.',
      }),
      new TestCatalog({
        id: 9,
        code: 'MIC002',
        testName: 'Stool Culture',
        category: 'Microbiology',
        department: 'Pathology',
        sampleType: 'Stool',
        price: 85,
        duration: '72 Hours',
        status: 'Active',
        description:
          'Identifies pathogenic bacteria in stool samples causing gastrointestinal infections.',
      }),
      new TestCatalog({
        id: 10,
        code: 'CAR002',
        testName: 'Troponin I',
        category: 'Cardiology',
        department: 'Clinical Lab',
        sampleType: 'Blood',
        price: 150,
        duration: '3 Hours',
        status: 'Active',
        description: 'Measures troponin I levels to diagnose heart attack.',
      }),
    ];
    // In real app: return this.httpClient.get<TestCatalog[]>(this.API_URL).pipe(catchError(this.handleError));
    return of(mockData).pipe(catchError(this.handleError));
  }

  /** POST: Add a new test */
  addTestCatalog(testCatalog: TestCatalog): Observable<TestCatalog> {
    this.dialogData = testCatalog;
    // In real app: return this.httpClient.post<TestCatalog>(this.API_URL, testCatalog).pipe(catchError(this.handleError));
    return of(testCatalog);
  }

  /** PUT: Update an existing test */
  updateTestCatalog(testCatalog: TestCatalog): Observable<TestCatalog> {
    this.dialogData = testCatalog;
    // In real app: return this.httpClient.put<TestCatalog>(`${this.API_URL}`, testCatalog).pipe(catchError(this.handleError));
    return of(testCatalog);
  }

  /** DELETE: Remove a test by ID */
  deleteTestCatalog(id: number): Observable<number> {
    // In real app: return this.httpClient.delete<void>(`${this.API_URL}`).pipe(map(() => id), catchError(this.handleError));
    return of(id);
  }

  /** Handle Http operation that failed */
  private handleError(_error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
