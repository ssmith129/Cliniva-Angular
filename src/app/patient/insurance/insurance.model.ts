export interface InsuranceClaim {
  id: number;
  claimId: string;
  policyId: string;
  claimDate: string;
  claimAmount: number;
  approvedAmount?: number;
  claimType: string;
  status: string;
  submittedDate: string;
  processedDate?: string;
}
