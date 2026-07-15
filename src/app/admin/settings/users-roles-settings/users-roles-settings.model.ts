export class UserRole {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;

  constructor(userRole: UserRole) {
    {
      this.id = userRole.id || this.getRandomID();
      this.name = userRole.name || '';
      this.email = userRole.email || '';
      this.role = userRole.role || '';
      this.status = userRole.status || 'Active';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return Number(S4() + S4());
  }
}
