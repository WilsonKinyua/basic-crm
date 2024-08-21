import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) { }

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    // check if the customer exists
    const customer = await this.customersRepository.findOne({
      where: { id: createLeadDto.customerId },
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    // create a new lead
    const lead = this.leadsRepository.create({
      ...createLeadDto,
      customer,
    });
    return this.leadsRepository.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadsRepository.find({ relations: ['customer', 'interactions'] });
  }

  async findOne(id: number) {
    return this.leadsRepository.findOne({ where: { id }, relations: ['customer', 'interactions'] });
  }

  async update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    try {
      const lead = await this.leadsRepository.findOne({ where: { id } });
      if (!lead) {
        throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);
      }

      if (updateLeadDto.customerId) {
        const customer = await this.customersRepository.findOne({ where: { id: updateLeadDto.customerId } });
        if (!customer) {
          throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }
        lead.customer = customer;
      }

      Object.assign(lead, updateLeadDto);

      return this.leadsRepository.save(lead);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const lead = await this.leadsRepository.findOne({ where: { id } });
      if (!lead) {
        throw new HttpException('Lead not found', HttpStatus.NOT_FOUND);
      }

      await this.leadsRepository.delete({ id });
      return lead;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}