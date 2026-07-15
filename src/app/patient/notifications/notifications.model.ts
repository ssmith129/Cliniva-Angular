export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string; // Alert, Reminder, Info
  date: string;
  time: string;
  status: string; // Read, Unread
}
