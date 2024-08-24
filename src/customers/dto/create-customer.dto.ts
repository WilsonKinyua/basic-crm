import { IsEmail, IsString, IsNotEmpty, IsMobilePhone, IsOptional } from 'class-validator';

// create a customer data transfer object (DTO)
export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsMobilePhone()
    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    companyName?: string;
}
