import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// create a dto for create cart item
export class CreateCartItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsEnum(['add', 'removeOne', 'emptyCart', 'checkout', 'increase', 'decrease'])
  @IsNotEmpty()
  actionType: string;
}
