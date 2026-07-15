import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MasterTableComponent, ColumnDefinition } from '@shared/components/master-table/master-table.component';

export interface PeriodicElement {
  checked: boolean;
  imageUrl: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  assignTo: string;
  date: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    checked: false,
    imageUrl: 'assets/images/user/user1.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user2.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user3.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user4.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user5.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user6.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user7.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'open',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user8.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'pending',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user9.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
  {
    checked: false,
    imageUrl: 'assets/images/user/user10.jpg',
    name: 'Tim Hank',
    email: 'test@example.com',
    subject: 'Image not Proper',
    status: 'closed',
    assignTo: 'John Deo',
    date: '27/05/2016',
    action: '',
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MasterTableComponent],
})
export class SupportComponent implements OnInit {
  columnDefinitions: ColumnDefinition[] = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'name', label: 'Name', type: 'nameWithImage', visible: true },
    { def: 'email', label: 'Email', type: 'email', visible: true },
    { def: 'subject', label: 'Subject', type: 'text', visible: true },
    { 
      def: 'status', 
      label: 'Status', 
      type: 'status', 
      visible: true,
      statusBadgeMap: {
        'open': 'badge badge-solid-green',
        'closed': 'badge badge-solid-red',
        'pending': 'badge badge-solid-orange'
      }
    },
    { def: 'assignTo', label: 'Assign To', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'text', visible: true },
    { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() {}

  ngOnInit() {
    this.dataSource.data = ELEMENT_DATA;
  }

  // Placeholder handlers since this component had no proper logic before
  handleAdd() {}
  handleEdit(_row: PeriodicElement) {
    // Placeholder implementation
    // Using _row parameter to satisfy linting
  }
  handleDelete(_row: PeriodicElement) {
    // Placeholder implementation
    // Using _row parameter to satisfy linting
  }
  handleRefresh() {}
}
