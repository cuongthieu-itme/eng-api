import {
  IsEAN,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

// create a dto for product based on schema model
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEAN()
  // @IsString()
  @IsNotEmpty()
  ean: string;

  @IsObject()
  productDetails?: any;

  @IsNumber()
  stock: number;
}
