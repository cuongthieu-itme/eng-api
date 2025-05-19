import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LectureStatus } from '@prisma/client';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  outline: string;

  @IsString()
  @IsOptional()
  pptxUrl?: string;

  @IsString()
  @IsOptional()
  mindmapUrl?: string;

  @IsEnum(LectureStatus)
  @IsOptional()
  status?: LectureStatus;
}
