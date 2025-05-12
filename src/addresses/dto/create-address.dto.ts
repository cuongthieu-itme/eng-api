import { IsBoolean, IsOptional, IsString } from 'class-validator';

//create dto based on the addresses schema
export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  zip: string;

  @IsOptional()
  @IsBoolean()
  isDefaultAddress?: boolean;
}
