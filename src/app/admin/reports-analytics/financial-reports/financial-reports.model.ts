import { formatDate } from '@angular/common';

export class FinancialReport {
  id: number;
  transactionId: string;
  description: string;
  amount: string;
  type: string;
  date: string;
  status: string;

  constructor(financialReport: FinancialReport) {
    {
      this.id = financialReport.id || this.getRandomID();
      this.transactionId = financialReport.transactionId || '';
      this.description = financialReport.description || '';
      this.amount = financialReport.amount || '';
      this.type = financialReport.type || 'Income';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.status = financialReport.status || 'Completed';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
