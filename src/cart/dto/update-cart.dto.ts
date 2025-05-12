import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsOptional()
  cartItem?: any;
  @IsEnum(['add', 'removeOne', 'emptyCart', 'checkout', 'increase', 'decrease'])
  @IsNotEmpty()
  actionType: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
