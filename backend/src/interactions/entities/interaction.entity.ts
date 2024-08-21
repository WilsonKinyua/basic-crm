import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Lead } from 'src/leads/entities/lead.entity';

@Entity()
export class Interaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    type: string; // call, email, meeting, etc.

    @Column({ type: 'text', nullable: true })
    description?: string; // description of the interaction

    @Column({ type: 'date' })
    date: Date; // date of the interaction

    @ManyToOne(() => Lead, (lead) => lead.interactions, { onDelete: 'CASCADE' }) // Many interactions can belong to one lead
    @JoinColumn({ name: 'leadId' })
    lead: Lead;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
