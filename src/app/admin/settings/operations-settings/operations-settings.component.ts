import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

interface Department {
  id: number;
  name: string;
  description: string;
}

interface Specialization {
  id: number;
  name: string;
  description: string;
}

interface ConsultationType {
  id: number;
  name: string;
  description: string;
}

interface WorkingHour {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

interface WardType {
  id: number;
  name: string;
  description: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-operations-settings',
  templateUrl: './operations-settings.component.html',
  styleUrls: ['./operations-settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    FeatherIconsComponent
],
})
export class OperationsSettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  // Forms
  departmentForm: FormGroup;
  specializationForm: FormGroup;
  consultationForm: FormGroup;
  workingHoursForm: FormGroup;
  wardTypeForm: FormGroup;

  // Data arrays
  departments: Department[] = [];
  specializations: Specialization[] = [];
  consultationTypes: ConsultationType[] = [];
  workingHours: WorkingHour[] = [];
  wardTypes: WardType[] = [];

  // Edit modes
  isEditingDepartment = false;
  isEditingSpecialization = false;
  isEditingConsultation = false;
  isEditingWorkingHour = false;
  isEditingWardType = false;

  // Selected items for editing
  selectedDepartment: Department | null = null;
  selectedSpecialization: Specialization | null = null;
  selectedConsultation: ConsultationType | null = null;
  selectedWorkingHour: WorkingHour | null = null;
  selectedWardType: WardType | null = null;

  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.specializationForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.workingHoursForm = this.fb.group({
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.wardTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    // Mock data for demonstration
    this.departments = [
      {
        id: 1,
        name: 'Cardiology',
        description: 'Heart and cardiovascular system',
      },
      { id: 2, name: 'Neurology', description: 'Brain and nervous system' },
      { id: 3, name: 'Orthopedics', description: 'Bones and muscles' },
    ];

    this.specializations = [
      {
        id: 1,
        name: 'Cardiologist',
        description: 'Specializes in heart conditions',
      },
      {
        id: 2,
        name: 'Neurologist',
        description: 'Specializes in brain disorders',
      },
      {
        id: 3,
        name: 'Orthopedic Surgeon',
        description: 'Specializes in bone surgery',
      },
    ];

    this.consultationTypes = [
      { id: 1, name: 'OPD', description: 'Outpatient Department' },
      { id: 2, name: 'IPD', description: 'Inpatient Department' },
      { id: 3, name: 'Emergency', description: 'Emergency care' },
    ];

    this.workingHours = [
      { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    ];

    this.wardTypes = [
      {
        id: 1,
        name: 'General Ward',
        description: 'Standard patient accommodation',
      },
      { id: 2, name: 'ICU', description: 'Intensive Care Unit' },
      { id: 3, name: 'Pediatric Ward', description: 'Children patient care' },
    ];
  }

  // Department methods
  addDepartment(): void {
    if (this.departmentForm.valid) {
      const newDepartment: Department = {
        id: this.departments.length + 1,
        name: this.departmentForm.get('name')?.value,
        description: this.departmentForm.get('description')?.value,
      };

      this.departments.push(newDepartment);
      this.departmentForm.reset();
      this.showNotification('Department added successfully!');
    }
  }

  editDepartment(department: Department): void {
    this.selectedDepartment = department;
    this.isEditingDepartment = true;
    this.departmentForm.patchValue({
      name: department.name,
      description: department.description,
    });
  }

  updateDepartment(): void {
    if (this.departmentForm.valid && this.selectedDepartment) {
      const index = this.departments.findIndex(
        (d) => d.id === this.selectedDepartment!.id
      );
      if (index !== -1) {
        this.departments[index] = {
          ...this.selectedDepartment,
          name: this.departmentForm.get('name')?.value,
          description: this.departmentForm.get('description')?.value,
        };
        this.cancelEditDepartment();
        this.showNotification('Department updated successfully!');
      }
    }
  }

  deleteDepartment(id: number): void {
    this.departments = this.departments.filter((d) => d.id !== id);
    this.showNotification('Department deleted successfully!');
  }

  cancelEditDepartment(): void {
    this.isEditingDepartment = false;
    this.selectedDepartment = null;
    this.departmentForm.reset();
  }

  // Specialization methods
  addSpecialization(): void {
    if (this.specializationForm.valid) {
      const newSpecialization: Specialization = {
        id: this.specializations.length + 1,
        name: this.specializationForm.get('name')?.value,
        description: this.specializationForm.get('description')?.value,
      };

      this.specializations.push(newSpecialization);
      this.specializationForm.reset();
      this.showNotification('Specialization added successfully!');
    }
  }

  editSpecialization(specialization: Specialization): void {
    this.selectedSpecialization = specialization;
    this.isEditingSpecialization = true;
    this.specializationForm.patchValue({
      name: specialization.name,
      description: specialization.description,
    });
  }

  updateSpecialization(): void {
    if (this.specializationForm.valid && this.selectedSpecialization) {
      const index = this.specializations.findIndex(
        (s) => s.id === this.selectedSpecialization!.id
      );
      if (index !== -1) {
        this.specializations[index] = {
          ...this.selectedSpecialization,
          name: this.specializationForm.get('name')?.value,
          description: this.specializationForm.get('description')?.value,
        };
        this.cancelEditSpecialization();
        this.showNotification('Specialization updated successfully!');
      }
    }
  }

  deleteSpecialization(id: number): void {
    this.specializations = this.specializations.filter((s) => s.id !== id);
    this.showNotification('Specialization deleted successfully!');
  }

  cancelEditSpecialization(): void {
    this.isEditingSpecialization = false;
    this.selectedSpecialization = null;
    this.specializationForm.reset();
  }

  // Consultation Type methods
  addConsultationType(): void {
    if (this.consultationForm.valid) {
      const newConsultation: ConsultationType = {
        id: this.consultationTypes.length + 1,
        name: this.consultationForm.get('name')?.value,
        description: this.consultationForm.get('description')?.value,
      };

      this.consultationTypes.push(newConsultation);
      this.consultationForm.reset();
      this.showNotification('Consultation type added successfully!');
    }
  }

  editConsultationType(consultation: ConsultationType): void {
    this.selectedConsultation = consultation;
    this.isEditingConsultation = true;
    this.consultationForm.patchValue({
      name: consultation.name,
      description: consultation.description,
    });
  }

  updateConsultationType(): void {
    if (this.consultationForm.valid && this.selectedConsultation) {
      const index = this.consultationTypes.findIndex(
        (c) => c.id === this.selectedConsultation!.id
      );
      if (index !== -1) {
        this.consultationTypes[index] = {
          ...this.selectedConsultation,
          name: this.consultationForm.get('name')?.value,
          description: this.consultationForm.get('description')?.value,
        };
        this.cancelEditConsultationType();
        this.showNotification('Consultation type updated successfully!');
      }
    }
  }

  deleteConsultationType(id: number): void {
    this.consultationTypes = this.consultationTypes.filter((c) => c.id !== id);
    this.showNotification('Consultation type deleted successfully!');
  }

  cancelEditConsultationType(): void {
    this.isEditingConsultation = false;
    this.selectedConsultation = null;
    this.consultationForm.reset();
  }

  // Working Hours methods
  addWorkingHour(): void {
    if (this.workingHoursForm.valid) {
      const newWorkingHour: WorkingHour = {
        id: this.workingHours.length + 1,
        day: this.workingHoursForm.get('day')?.value,
        startTime: this.workingHoursForm.get('startTime')?.value,
        endTime: this.workingHoursForm.get('endTime')?.value,
      };

      this.workingHours.push(newWorkingHour);
      this.workingHoursForm.reset();
      this.showNotification('Working hour added successfully!');
    }
  }

  editWorkingHour(workingHour: WorkingHour): void {
    this.selectedWorkingHour = workingHour;
    this.isEditingWorkingHour = true;
    this.workingHoursForm.patchValue({
      day: workingHour.day,
      startTime: workingHour.startTime,
      endTime: workingHour.endTime,
    });
  }

  updateWorkingHour(): void {
    if (this.workingHoursForm.valid && this.selectedWorkingHour) {
      const index = this.workingHours.findIndex(
        (w) => w.id === this.selectedWorkingHour!.id
      );
      if (index !== -1) {
        this.workingHours[index] = {
          ...this.selectedWorkingHour,
          day: this.workingHoursForm.get('day')?.value,
          startTime: this.workingHoursForm.get('startTime')?.value,
          endTime: this.workingHoursForm.get('endTime')?.value,
        };
        this.cancelEditWorkingHour();
        this.showNotification('Working hour updated successfully!');
      }
    }
  }

  deleteWorkingHour(id: number): void {
    this.workingHours = this.workingHours.filter((w) => w.id !== id);
    this.showNotification('Working hour deleted successfully!');
  }

  cancelEditWorkingHour(): void {
    this.isEditingWorkingHour = false;
    this.selectedWorkingHour = null;
    this.workingHoursForm.reset();
  }

  // Ward Type methods
  addWardType(): void {
    if (this.wardTypeForm.valid) {
      const newWardType: WardType = {
        id: this.wardTypes.length + 1,
        name: this.wardTypeForm.get('name')?.value,
        description: this.wardTypeForm.get('description')?.value,
      };

      this.wardTypes.push(newWardType);
      this.wardTypeForm.reset();
      this.showNotification('Ward type added successfully!');
    }
  }

  editWardType(wardType: WardType): void {
    this.selectedWardType = wardType;
    this.isEditingWardType = true;
    this.wardTypeForm.patchValue({
      name: wardType.name,
      description: wardType.description,
    });
  }

  updateWardType(): void {
    if (this.wardTypeForm.valid && this.selectedWardType) {
      const index = this.wardTypes.findIndex(
        (w) => w.id === this.selectedWardType!.id
      );
      if (index !== -1) {
        this.wardTypes[index] = {
          ...this.selectedWardType,
          name: this.wardTypeForm.get('name')?.value,
          description: this.wardTypeForm.get('description')?.value,
        };
        this.cancelEditWardType();
        this.showNotification('Ward type updated successfully!');
      }
    }
  }

  deleteWardType(id: number): void {
    this.wardTypes = this.wardTypes.filter((w) => w.id !== id);
    this.showNotification('Ward type deleted successfully!');
  }

  cancelEditWardType(): void {
    this.isEditingWardType = false;
    this.selectedWardType = null;
    this.wardTypeForm.reset();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
