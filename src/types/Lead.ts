export interface Lead {
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    companyName?: string;
    createdAt: Date;
    updatedAt: Date;
}