export class OTSchedule {
  id: number;
  scheduleId: string;
  patientName: string;
  patientImg: string;
  surgeryType: string;
  surgeonName: string;
  anesthetistName: string;
  otRoom: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  status: string;
  notes: string;

  constructor(schedule: Partial<OTSchedule>) {
    this.id = schedule.id || this.getRandomID();
    this.scheduleId = schedule.scheduleId || '';
    this.patientName = schedule.patientName || '';
    this.patientImg = schedule.patientImg || 'assets/images/user/user1.jpg';
    this.surgeryType = schedule.surgeryType || '';
    this.surgeonName = schedule.surgeonName || '';
    this.anesthetistName = schedule.anesthetistName || '';
    this.otRoom = schedule.otRoom || '';
    this.scheduledDate = schedule.scheduledDate || new Date().toISOString();
    this.scheduledTime = schedule.scheduledTime || '';
    this.duration = schedule.duration || '';
    this.status = schedule.status || 'Scheduled';
    this.notes = schedule.notes || '';
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
