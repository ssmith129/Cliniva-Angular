import { formatDate } from '@angular/common';

export class HrReport {
  id: number;
  img: string;
  employeeName: string;
  department: string;
  designation: string;
  presentDays: number;
  absentDays: number;
  salary: number;
  paymentStatus: string;
  month: string;

  constructor(hrReport: HrReport) {
    this.id = hrReport.id || this.getRandomID();
    this.img = hrReport.img || 'assets/images/user/user1.jpg';
    this.employeeName = hrReport.employeeName || '';
    this.department = hrReport.department || '';
    this.designation = hrReport.designation || '';
    this.presentDays = hrReport.presentDays || 0;
    this.absentDays = hrReport.absentDays || 0;
    this.salary = hrReport.salary || 0;
    this.paymentStatus = hrReport.paymentStatus || 'Pending';
    this.month = hrReport.month || formatDate(new Date(), 'yyyy-MM', 'en') || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
