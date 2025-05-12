import { IsOptional } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  pagination?: boolean;

  @IsOptional()
  productName?: string;
}
