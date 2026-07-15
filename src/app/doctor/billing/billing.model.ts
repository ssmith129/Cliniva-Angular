export interface Billing {
  id: number;
  invoiceId: string;
  patientName: string;
  img: string;
  patientId: string;
  consultationDate: string;
  serviceType: string;
  amount: number;
  paymentStatus: string;
  paymentMethod?: string;
  paymentDate?: string;
}
