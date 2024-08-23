import type { Lead } from "./Lead";

export interface Interaction {
    id: number;
    type: string;
    description?: string;
    date: Date;
    lead: Lead;
    createdAt: Date;
    updatedAt: Date;
}