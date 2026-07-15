import { Route } from '@angular/router';

export const HR_ROUTE: Route[] = [
  {
    path: 'leave-requests',
    loadComponent: () =>
      import('./leave-requests/leave-requests.component').then(
        (m) => m.LeaveRequestsComponent
      ),
  },
  {
    path: 'leave-balance',
    loadComponent: () =>
      import('./leave-balance/leave-balance.component').then(
        (m) => m.LeaveBalanceComponent
      ),
  },
  {
    path: 'leave-types',
    loadComponent: () =>
      import('./leave-types/leave-types.component').then(
        (m) => m.LeaveTypesComponent
      ),
  },
  {
    path: 'holidays',
    loadComponent: () =>
      import('./all-holidays/all-holidays.component').then(
        (m) => m.AllHolidayComponent
      ),
  },
  {
    path: 'todays-attendance',
    loadComponent: () =>
      import('./todays-attendance/todays-attendance.component').then(
        (m) => m.TodaysAttendanceComponent
      ),
  },
  {
    path: 'emp-attendance',
    loadComponent: () =>
      import('./employee-attendance/employee-attendance.component').then(
        (m) => m.EmployeeAttendanceComponent
      ),
  },
  {
    path: 'attendance-sheet',
    loadComponent: () =>
      import('./attendance-sheet/attendance-sheet.component').then(
        (m) => m.AttendanceSheetComponent
      ),
  },
  {
    path: 'employee-salary',
    loadComponent: () =>
      import('./employee-salary/employee-salary.component').then(
        (m) => m.EmployeeSalaryComponent
      ),
  },
  {
    path: 'payslip',
    loadComponent: () =>
      import('./payslip/payslip.component').then((m) => m.PayslipComponent),
  },
  {
    path: 'id-card-generator',
    loadComponent: () =>
      import('./id-card-generator/id-card-generator.component').then(
        (c) => c.IdCardGeneratorComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../authentication/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
