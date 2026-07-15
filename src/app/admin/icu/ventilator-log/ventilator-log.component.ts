import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ventilator-log',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, MasterTableComponent],
  templateUrl: './ventilator-log.component.html',
  styleUrls: ['./ventilator-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VentilatorLogComponent implements OnInit {
  public dataSource = new MatTableDataSource<unknown>();
  public isLoading = true;

  public columns: ColumnDefinition[] = [
    { def: 'bed', label: 'Bed', type: 'text', visible: true },
    { def: 'patientName', label: 'Patient Name', type: 'text', visible: true },
    { def: 'ventModel', label: 'Ventilator Model', type: 'text', visible: true },
    { def: 'mode', label: 'Mode', type: 'text', visible: true },
    { def: 'fio2', label: 'FiO2 (%)', type: 'text', visible: true },
    { def: 'peep', label: 'PEEP', type: 'text', visible: true },
    { def: 'rate', label: 'Set Rate', type: 'text', visible: true },
    { def: 'status', label: 'Status', type: 'status', visible: true, 
      statusBadgeMap: { 'Stable': 'badge badge-solid-green', 'Weaning': 'badge badge-solid-blue', 'Critical': 'badge badge-solid-red' } },
    { def: 'lastCheck', label: 'Last Check', type: 'text', visible: true },
  ];

  ngOnInit() {
    // Simulate API load
    setTimeout(() => {
      this.dataSource.data = [
        { bed: 'Bed 01', patientName: 'John Smith', ventModel: 'Puritan Bennett 980', mode: 'SIMV', fio2: '40', peep: '5', rate: '14', status: 'Stable', lastCheck: '11:00 AM' },
        { bed: 'Bed 02', patientName: 'Emily Carter', ventModel: 'Drager Evita V500', mode: 'PCV', fio2: '60', peep: '8', rate: '18', status: 'Critical', lastCheck: '11:15 AM' },
        { bed: 'Bed 03', patientName: 'Michael Lee', ventModel: 'Hamilton G5', mode: 'CPAP', fio2: '30', peep: '5', rate: '-', status: 'Weaning', lastCheck: '10:45 AM' },
        { bed: 'Bed 04', patientName: 'Sarah Connor', ventModel: 'Puritan Bennett 980', mode: 'AC/VC', fio2: '50', peep: '6', rate: '16', status: 'Stable', lastCheck: '11:20 AM' },
        { bed: 'Bed 05', patientName: 'David Miller', ventModel: 'Hamilton G5', mode: 'SIMV', fio2: '45', peep: '5', rate: '12', status: 'Stable', lastCheck: '11:30 AM' },
        { bed: 'Bed 06', patientName: 'Emma Watson', ventModel: 'Drager Evita V500', mode: 'PCV', fio2: '70', peep: '10', rate: '20', status: 'Critical', lastCheck: '11:40 AM' },
        { bed: 'Bed 07', patientName: 'William Davies', ventModel: 'Puritan Bennett 980', mode: 'CPAP', fio2: '35', peep: '5', rate: '-', status: 'Weaning', lastCheck: '11:50 AM' }
      ];
      this.isLoading = false;
    }, 1500);
  }
}
