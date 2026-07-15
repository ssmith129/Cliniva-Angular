export interface Task {
  id: number;
  taskId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  dueDate: string;
  status: string;
  assignedTo: string;
  patientId?: string;
  patientName?: string;
}
