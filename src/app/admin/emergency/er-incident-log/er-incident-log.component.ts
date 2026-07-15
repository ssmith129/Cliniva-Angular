import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-er-incident-log',
  standalone: true,
  imports: [CommonModule, MasterTableComponent, BreadcrumbComponent, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './er-incident-log.component.html',
  styleUrl: './er-incident-log.component.scss'
})
export class ErIncidentLogComponent implements OnInit {
  dataSource = new MatTableDataSource<unknown>();
  columns: ColumnDefinition[] = [];

  ngOnInit() {
    this.columns = [
      { def: 'date', label: 'Date/Time', type: 'text', visible: true, sortable: true },
      { def: 'incidentType', label: 'Incident Type', type: 'text', visible: true, sortable: true },
      { def: 'patientId', label: 'Patient ID', type: 'text', visible: true, sortable: true },
      { def: 'description', label: 'Description', type: 'text', visible: true },
      { def: 'reportedBy', label: 'Reported By', type: 'text', visible: true, sortable: true },
      { 
        def: 'status', 
        label: 'Status', 
        type: 'status', 
        visible: true, 
        sortable: true,
        statusBadgeMap: { 
          'Resolved': 'badge col-green', 
          'Under Investigation': 'badge col-orange', 
          'Critical': 'badge col-red' 
        } 
      }
    ];

    this.dataSource.data = [
      { date: '12-Aug-2023 14:30', incidentType: 'Code Blue', patientId: 'ER-1006', description: 'Cardiac arrest in Bed 1', reportedBy: 'Dr. Taylor', status: 'Resolved' },
      { date: '12-Aug-2023 16:45', incidentType: 'Security Issue', patientId: 'ER-1022', description: 'Combative patient, security called', reportedBy: 'Nurse Smith', status: 'Under Investigation' },
      { date: '13-Aug-2023 09:15', incidentType: 'Equipment Failure', patientId: '-', description: 'Defibrillator malfunction in Bed 4', reportedBy: 'Tech Adams', status: 'Critical' },
      { date: '13-Aug-2023 11:20', incidentType: 'Code Red', patientId: '-', description: 'Small fire in break room', reportedBy: 'Janitor Lee', status: 'Resolved' },
      { date: '14-Aug-2023 02:10', incidentType: 'Transfer Delay', patientId: 'ER-1045', description: 'ICU bed unavailable for 4 hours', reportedBy: 'Dr. Taylor', status: 'Resolved' },
    ];
  }
}
