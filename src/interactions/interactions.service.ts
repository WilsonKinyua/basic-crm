import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interaction } from './entities/interaction.entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionsService {
    constructor(
        @InjectRepository(Interaction)
        private interactionsRepository: Repository<Interaction>,
        @InjectRepository(Lead)
        private leadsRepository: Repository<Lead>,
    ) { }

    async create(createInteractionDto: CreateInteractionDto): Promise<Interaction> {
        try {
            // check if the lead exists
            const lead = await this.leadsRepository.findOne({
                where: { id: createInteractionDto.leadId },
            });
            if (!lead) {
                throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);
            }
            const interaction = this.interactionsRepository.create({
                ...createInteractionDto,
                lead,
            });
            return this.interactionsRepository.save(interaction);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<Interaction[]> {
        return this.interactionsRepository.find({ relations: ['lead'] });
    }

    async findOne(id: number): Promise<Interaction> {
        return this.interactionsRepository.findOne({ where: { id }, relations: ['lead'] });
    }

    async update(id: number, updateInteractionDto: UpdateInteractionDto): Promise<Interaction> {
        const interaction = await this.interactionsRepository.findOne({ where: { id }, relations: ['lead'] });
        if (!interaction) {
            throw new HttpException('Interaction not found', HttpStatus.NOT_FOUND);
        }
        if (updateInteractionDto.leadId && updateInteractionDto.leadId !== interaction.lead.id) {
            const lead = await this.leadsRepository.findOne({ where: { id: updateInteractionDto.leadId } });
            if (!lead) {
                throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);
            }
            interaction.lead = lead;
        }
        Object.assign(interaction, updateInteractionDto);
        return this.interactionsRepository.save(interaction);
    }

    async remove(id: number): Promise<void> {
        // check if the interaction exists
        const interaction = await this.interactionsRepository.findOne({
            where: { id },
        });
        if (!interaction) {
            throw new HttpException('Interaction not found', HttpStatus.NOT_FOUND);
        }
        await this.interactionsRepository.delete(id);
    }
}