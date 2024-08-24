import { IsEmail, IsString, IsNotEmpty, IsMobilePhone, IsOptional, IsNumber } from 'class-validator';

export class CreateLeadDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsMobilePhone()
    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    @IsNotEmpty()
    customerId: number;
}
