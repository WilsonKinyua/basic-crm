import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller('interactions')
export class InteractionsController {
    constructor(private readonly interactionsService: InteractionsService) { }

    // create a new interaction
    @Post()
    create(@Body() createInteractionDto: CreateInteractionDto) {
        return this.interactionsService.create(createInteractionDto);
    }

    // find all interactions
    @Get()
    findAll() {
        return this.interactionsService.findAll();
    }

    // find an interaction by id
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.interactionsService.findOne(id);
    }

    // update an interaction by id
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateInteractionDto: UpdateInteractionDto) {
        return this.interactionsService.update(id, updateInteractionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.interactionsService.remove(id);
    }
}
