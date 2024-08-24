import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  // create a new lead
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  // find all leads
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  // find a lead by id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leadsService.findOne(id);
  }

  // update a lead by id
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.leadsService.remove(id);
  }
}
