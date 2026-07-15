import { Route } from '@angular/router';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.routes').then(
        (m) => m.APPOINTMENT_ROUTE
      ),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.routes').then((m) => m.DOCTOR_ROUTE),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.routes').then((m) => m.STAFF_ROUTE),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.routes').then((m) => m.PATIENT_ROUTE),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.routes').then((m) => m.ACCOUNTS_ROUTE),
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.routes').then((m) => m.ROOMS_ROUTE),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.DEPARTMENT_ROUTE
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.routes').then((m) => m.INVENTORY_ROUTE),
  },
  {
    path: 'records',
    loadChildren: () =>
      import('./records/records.routes').then((m) => m.RECORDS_ROUTE),
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.routes').then((m) => m.AMBULANCE_ROUTE),
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./pharmacy/pharmacy.routes').then((m) => m.PHARMACY_ROUTE),
  },
  {
    path: 'blood-bank',
    loadChildren: () =>
      import('./blood-bank/blood-bank.routes').then((m) => m.BLOOD_BANK_ROUTE),
  },
  {
    path: 'human-resources',
    loadChildren: () =>
      import('./human-resources/human-resources.routes').then(
        (m) => m.HR_ROUTE
      ),
  },
  {
    path: 'insurance',
    loadChildren: () =>
      import('./insurance/insurance.routes').then((m) => m.INSURANCE_ROUTE),
  },
  {
    path: 'laboratory',
    loadChildren: () =>
      import('./laboratory/laboratory.routes').then((m) => m.LABORATORY_ROUTE),
  },
  {
    path: 'emr',
    loadChildren: () => import('./emr/emr.routes').then((m) => m.EMR_ROUTE),
  },
  {
    path: 'documents-consent',
    loadChildren: () =>
      import('./documents-consent/documents-consent.routes').then(
        (m) => m.DOCUMENTS_CONSENT_ROUTE
      ),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.routes').then((m) => m.FEEDBACK_ROUTE),
  },
  {
    path: 'telemedicine',
    loadChildren: () =>
      import('./telemedicine/telemedicine.routes').then(
        (m) => m.TELEMEDICINE_ROUTE
      ),
  },
  {
    path: 'equipments',
    loadChildren: () =>
      import('./equipments/equipments.routes').then((m) => m.EQUIPMENTS_ROUTE),
  },
  {
    path: 'radiology',
    loadChildren: () => import('./radiology/radiology.routes').then((m) => m.RADIOLOGY_ROUTE),
  },
  {
    path: 'waste-management',
    loadChildren: () => import('./waste-management/waste-management.routes').then((m) => m.WASTE_MANAGEMENT_ROUTE),
  },
  {
    path: 'quality-compliance',
    loadChildren: () => import('./quality-compliance/quality-compliance.routes').then((m) => m.QUALITY_COMPLIANCE_ROUTE),
  },
  {
    path: 'visitor-management',
    loadChildren: () => import('./visitor-management/visitor-management.routes').then((m) => m.VISITOR_MANAGEMENT_ROUTE),
  },
  {
    path: 'reports-analytics',
    loadChildren: () => import('./reports-analytics/reports-analytics.routes').then((m) => m.REPORTS_ANALYTICS_ROUTE),
  },
  {
    path: 'ot',
    loadChildren: () => import('./ot/ot.routes').then((m) => m.OT_ROUTE),
  },
  {
    path: 'discharge',
    loadChildren: () =>
      import('./discharge/discharge.routes').then((m) => m.DISCHARGE_ROUTE),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then((m) => m.SETTINGS_ROUTE),
  },
  {
    path: 'emergency',
    loadChildren: () => import('./emergency/emergency.routes').then((m) => m.EMERGENCY_ROUTE),
  },
  {
    path: 'icu',
    loadChildren: () => import('./icu/icu.routes').then((m) => m.ICU_ROUTE),
  },
  {
    path: 'diet-nutrition',
    loadChildren: () => import('./diet-nutrition/diet-nutrition.routes').then((m) => m.DIET_NUTRITION_ROUTE),
  },
  {
    path: 'physiotherapy',
    loadChildren: () => import('./physiotherapy/physiotherapy.routes').then((m) => m.PHYSIOTHERAPY_ROUTE),
  },
];
