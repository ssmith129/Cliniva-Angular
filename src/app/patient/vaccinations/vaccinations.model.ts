export interface Vaccination {
  id: number;
  vaccineId: string;
  vaccineName: string;
  vaccineType: string;
  administeredDate: string;
  nextDueDate?: string;
  administeredBy: string;
  batchNumber: string;
  site: string;
  status: string;
}
