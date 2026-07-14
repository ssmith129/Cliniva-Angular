import { Component, inject, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadComponent,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
})
export class AddPatientComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  // Separate step-wise form groups for sequential validation
  personalForm: FormGroup;
  contactForm: FormGroup;
  medicalForm: FormGroup;
  insuranceForm: FormGroup;
  admissionConsentForm: FormGroup;

  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  private canvasEl?: HTMLCanvasElement;
  private drawing = false;
  private canvasListeners: Array<{ name: string; handler: (e: MouseEvent | TouchEvent) => void }> = [];

  @ViewChild('sigCanvas') set sigCanvas(ref: ElementRef<HTMLCanvasElement> | undefined) {
    if (ref && ref.nativeElement) {
      this.initSignaturePad(ref.nativeElement);
    }
  }

  constructor() {
    this.personalForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.min(0), Validators.max(120)]],
      maritalStatus: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      patientId: [''],
      uploadFile: [''],
    });

    this.contactForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
      emergencyContactName: ['', [Validators.required]],
      emergencyContactRelation: ['', [Validators.required]],
      emergencyContactPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });

    this.medicalForm = this.fb.group({
      bGroup: ['', [Validators.required]],
      bPresure: [''],
      sugger: [''],
      allergies: [''],
      chronicDiseases: [''],
      currentMedications: [''],
      injury: [''],
    });

    this.insuranceForm = this.fb.group({
      insuranceProvider: [''],
      insurancePolicyNumber: [''],
      insuranceCoverage: [''],
    });

    this.admissionConsentForm = this.fb.group({
      admissionDate: [''],
      assignedDoctor: [''],
      wardNumber: [''],
      roomNumber: [''],
      admissionReason: [''],
      consent: [false, [Validators.requiredTrue]],
      signature: ['', [Validators.required]],
    });
  }

  private initSignaturePad(canvas: HTMLCanvasElement) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Clear old state/listeners
    this.cleanupCanvas();
    this.canvasEl = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      this.drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      if (e.cancelable) e.preventDefault();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!this.drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      if (e.cancelable) e.preventDefault();
    };

    const stopDraw = () => {
      if (!this.drawing) return;
      this.drawing = false;
      this.admissionConsentForm.patchValue({ signature: canvas.toDataURL() });
      this.admissionConsentForm.get('signature')?.markAsTouched();
    };

    const addListener = (el: HTMLElement, name: string, handler: (e: MouseEvent | TouchEvent) => void, options?: AddEventListenerOptions | boolean) => {
      el.addEventListener(name, handler as EventListener, options);
      this.canvasListeners.push({ name, handler });
    };

    addListener(canvas, 'mousedown', startDraw);
    addListener(canvas, 'mousemove', draw);
    addListener(canvas, 'mouseup', stopDraw);
    addListener(canvas, 'mouseleave', stopDraw);

    addListener(canvas, 'touchstart', startDraw, { passive: false });
    addListener(canvas, 'touchmove', draw, { passive: false });
    addListener(canvas, 'touchend', stopDraw);
  }

  clearSignature() {
    if (this.canvasEl) {
      const ctx = this.canvasEl.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.admissionConsentForm.patchValue({ signature: '' });
      }
    }
  }

  private cleanupCanvas() {
    if (this.canvasEl) {
      this.canvasListeners.forEach(({ name, handler }) => {
        this.canvasEl?.removeEventListener(name, handler as EventListener);
      });
      this.canvasListeners = [];
    }
  }

  ngOnDestroy() {
    this.cleanupCanvas();
  }

  onSubmit() {
    if (
      this.personalForm.valid &&
      this.contactForm.valid &&
      this.medicalForm.valid &&
      this.insuranceForm.valid &&
      this.admissionConsentForm.valid
    ) {
      const patientData = {
        ...this.personalForm.value,
        ...this.contactForm.value,
        ...this.medicalForm.value,
        ...this.insuranceForm.value,
        ...this.admissionConsentForm.value,
      };
      console.log('Registering Patient Successfully:', patientData);
    }
  }
}
