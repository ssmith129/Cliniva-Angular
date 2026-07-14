export interface Feedback {
  id: number;
  ticketId: string;
  subject: string;
  category: string;
  rating?: number;
  status: string;
  date: string;
  description: string;
}
