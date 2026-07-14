export interface Document {
  id: number;
  docId: string;
  title: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: string;
  description?: string;
}
