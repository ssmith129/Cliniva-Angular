import { formatDate } from '@angular/common';

export class PharmacyReport {
  id: number;
  medicineName: string;
  category: string;
  unitsSold: number;
  revenue: number;
  stockMovement: number;
  expiryDate: string;
  status: string;
  date: string;

  constructor(pharmacyReport: PharmacyReport) {
    this.id = pharmacyReport.id || this.getRandomID();
    this.medicineName = pharmacyReport.medicineName || '';
    this.category = pharmacyReport.category || '';
    this.unitsSold = pharmacyReport.unitsSold || 0;
    this.revenue = pharmacyReport.revenue || 0;
    this.stockMovement = pharmacyReport.stockMovement || 0;
    this.expiryDate = pharmacyReport.expiryDate || '';
    this.status = pharmacyReport.status || 'In Stock';
    this.date = pharmacyReport.date || formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
