export interface InventoryRequest {
  id: number;
  requestId: string;
  itemName: string;
  category: string;
  quantity: number;
  requestDate: string;
  requestedBy: string;
  status: string;
  priority: string;
  approvedBy?: string;
  approvalDate?: string;
}
