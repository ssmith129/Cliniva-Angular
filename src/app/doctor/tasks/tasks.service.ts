import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private data: Task[] = [
    {
      id: 1,
      taskId: 'TSK-001',
      title: 'Review Lab Reports',
      description: 'Review blood test results for John Doe',
      category: 'Administrative',
      priority: 'High',
      dueDate: '2023-10-28',
      status: 'Pending',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'P-001',
      patientName: 'John Doe',
    },
    {
      id: 2,
      taskId: 'TSK-002',
      title: 'Update Patient Records',
      description: 'Update medical history for Jane Smith',
      category: 'Clinical',
      priority: 'Medium',
      dueDate: '2023-10-29',
      status: 'In Progress',
      assignedTo: 'Dr. John Deo',
      patientId: 'P-002',
      patientName: 'Jane Smith',
    },
    {
      id: 3,
      taskId: 'TSK-003',
      title: 'Prepare Discharge Summary',
      description: 'Prepare discharge papers for Mike Johnson',
      category: 'Documentation',
      priority: 'Routine',
      dueDate: '2023-10-30',
      status: 'Completed',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'P-003',
      patientName: 'Mike Johnson',
    },
    {
      id: 4,
      taskId: 'TSK-004',
      title: 'Follow-up Call',
      description: 'Call Emily Davis for post-surgery check',
      category: 'Clinical',
      priority: 'Medium',
      dueDate: '2023-11-01',
      status: 'Pending',
      assignedTo: 'Dr. John Deo',
      patientId: 'P-004',
      patientName: 'Emily Davis',
    },
    {
      id: 5,
      taskId: 'TSK-005',
      title: 'Insurance Verification',
      description: 'Verify insurance coverage for Robert Wilson',
      category: 'Administrative',
      priority: 'Low',
      dueDate: '2023-11-02',
      status: 'Pending',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'P-005',
      patientName: 'Robert Wilson',
    },
    {
      id: 6,
      taskId: 'TSK-006',
      title: 'Prescription Renewal',
      description: 'Renew blood pressure medication for Sarah Miller',
      category: 'Clinical',
      priority: 'High',
      dueDate: '2023-11-03',
      status: 'Pending',
      assignedTo: 'Dr. John Deo',
      patientId: 'P-006',
      patientName: 'Sarah Miller',
    },
    {
      id: 7,
      taskId: 'TSK-007',
      title: 'Staff Meeting',
      description: 'Weekly department coordination meeting',
      category: 'Administrative',
      priority: 'Routine',
      dueDate: '2023-11-04',
      status: 'Pending',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'N/A',
      patientName: 'N/A',
    },
    {
      id: 8,
      taskId: 'TSK-008',
      title: 'Equipment Maintenance',
      description: 'Schedule maintenance for MRI machine',
      category: 'Documentation',
      priority: 'Medium',
      dueDate: '2023-11-05',
      status: 'Pending',
      assignedTo: 'Dr. John Deo',
      patientId: 'N/A',
      patientName: 'N/A',
    },
    {
      id: 9,
      taskId: 'TSK-009',
      title: 'Referral Processing',
      description: 'Process specialist referral for David Taylor',
      category: 'Clinical',
      priority: 'Medium',
      dueDate: '2023-11-06',
      status: 'Pending',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'P-007',
      patientName: 'David Taylor',
    },
    {
      id: 10,
      taskId: 'TSK-010',
      title: 'Inventory Audit',
      description: 'Monthly audit of surgical supplies',
      category: 'Administrative',
      priority: 'Low',
      dueDate: '2023-11-07',
      status: 'Pending',
      assignedTo: 'Dr. John Deo',
      patientId: 'N/A',
      patientName: 'N/A',
    },
    {
      id: 11,
      taskId: 'TSK-011',
      title: 'Patient Education',
      description: 'Conduct diabetes education session for Linda Anderson',
      category: 'Clinical',
      priority: 'Medium',
      dueDate: '2023-11-08',
      status: 'Pending',
      assignedTo: 'Dr. Sarah Wilson',
      patientId: 'P-008',
      patientName: 'Linda Anderson',
    },
    {
      id: 12,
      taskId: 'TSK-012',
      title: 'Research Review',
      description: 'Review latest oncology research papers',
      category: 'Documentation',
      priority: 'Routine',
      dueDate: '2023-11-09',
      status: 'Pending',
      assignedTo: 'Dr. John Deo',
      patientId: 'N/A',
      patientName: 'N/A',
    },
  ];

  private dataSubject = new BehaviorSubject<Task[]>(this.data);

  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return this.dataSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.data.length + 1;
    this.data.unshift(task);
    this.dataSubject.next(this.data);
  }

  updateTask(task: Task): void {
    const index = this.data.findIndex((d) => d.id === task.id);
    if (index !== -1) {
      this.data[index] = task;
      this.dataSubject.next(this.data);
    }
  }

  deleteTask(id: number): void {
    this.data = this.data.filter((d) => d.id !== id);
    this.dataSubject.next(this.data);
  }
}
