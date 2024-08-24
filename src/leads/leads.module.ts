import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { LeadsController } from './leads.controller';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Customer])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule { }
