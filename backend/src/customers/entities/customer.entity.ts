import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Lead } from 'src/leads/entities/lead.entity';

@Entity()
export class Customer { // Customer Entity
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true }) //  email uniqueness
    email: string;

    @Column({ type: 'varchar', length: 100 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    companyName?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Lead, lead => lead.customer) // One customer can have many leads
    leads: Lead[];
}
