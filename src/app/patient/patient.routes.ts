import { Route } from "@angular/router";

export const PATIENT_ROUTE: Route[] = [
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./appointments/patient-appointments.routes").then(
        (m) => m.PATIENT_APPOINTMENT_ROUTE
      ),
  },
  {
    path: "prescriptions",
    loadComponent: () =>
      import("./prescriptions/prescriptions.component").then((m) => m.PrescriptionsComponent),
  },
  {
    path: "records",
    loadComponent: () =>
      import("./medical-records/medical-records.component").then((m) => m.MedicalRecordsComponent),
  },
  {
    path: "billing",
    loadComponent: () =>
      import("./billing/billing.component").then((m) => m.BillingComponent),
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((m) => m.SettingsComponent),
  },
  {
    path: "documents",
    loadComponent: () =>
      import("./documents/documents.component").then((m) => m.DocumentsComponent),
  },
  {
    path: "emergency",
    loadComponent: () =>
      import("./emergency/emergency.component").then((m) => m.EmergencyComponent),
  },
  {
    path: "family-members",
    loadComponent: () =>
      import("./family-members/family-members.component").then((m) => m.FamilyMembersComponent),
  },
  {
    path: "feedback",
    loadComponent: () =>
      import("./feedback/feedback.component").then((m) => m.FeedbackComponent),
  },
  {
    path: "health-monitoring",
    loadComponent: () =>
      import("./health-monitoring/health-monitoring.component").then((m) => m.HealthMonitoringComponent),
  },
  {
    path: "health-plans",
    loadComponent: () =>
      import("./health-plans/health-plans.component").then((m) => m.HealthPlansComponent),
  },
  {
    path: "insurance",
    loadComponent: () =>
      import("./insurance/insurance.component").then((m) => m.InsuranceComponent),
  },
  {
    path: "lab-reports",
    loadComponent: () =>
      import("./lab-reports/lab-reports.component").then((m) => m.LabReportsComponent),
  },
  {
    path: "lifestyle",
    loadComponent: () =>
      import("./lifestyle/lifestyle.component").then((m) => m.LifestyleComponent),
  },
  {
    path: "notifications",
    loadComponent: () =>
      import("./notifications/notifications.component").then((m) => m.NotificationsComponent),
  },
  {
    path: "telemedicine",
    loadComponent: () =>
      import("./telemedicine/telemedicine.component").then((m) => m.TelemedicineComponent),
  },
  {
    path: "vaccinations",
    loadComponent: () =>
      import("./vaccinations/vaccinations.component").then((m) => m.VaccinationsComponent),
  },
  {
    path: "ai-settings",
    loadComponent: () =>
      import("./ai-settings/ai-settings.component").then((m) => m.PatientAiSettingsComponent),
  },
  {
    path: "**",
    loadComponent: () =>
      import("../authentication/page404/page404.component").then((m) => m.Page404Component),
  },
];
