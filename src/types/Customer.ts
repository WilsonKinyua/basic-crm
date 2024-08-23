import type { Lead } from "./Lead";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  createdAt: Date;
  updatedAt: Date;
  leads?: Lead[];
}
