import type { Customer } from "./Customer";

export interface Lead {
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    companyName?: string;
    createdAt: Date;
    updatedAt: Date;
    customer?: Customer;
}