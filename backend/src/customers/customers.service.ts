import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) { }

  // create a new customer
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  // find all customers
  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ['leads'] });
  }

  // find a customer by id
  async findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOne({ where: { id }, relations: ['leads'] });
  }

  // update a customer by id
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customersRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  // remove a customer by id
  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
