import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateInteractionDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    leadId: number;
}
