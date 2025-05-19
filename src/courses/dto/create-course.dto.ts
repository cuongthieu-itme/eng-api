import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @IsOptional()
  topics?: string[];
}
