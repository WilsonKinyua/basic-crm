import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Interaction } from 'src/interactions/entities/interaction.entity';

@Entity()
export class Lead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    phoneNumber?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    companyName?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.leads) // Many leads can belong to one customer
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @OneToMany(() => Interaction, interaction => interaction.lead) // One lead can have many interactions
    interactions: Interaction[];
}
