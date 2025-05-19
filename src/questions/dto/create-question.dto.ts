import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  lectureId: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  optionA: string;

  @IsString()
  @IsNotEmpty()
  optionB: string;

  @IsString()
  @IsNotEmpty()
  optionC: string;

  @IsString()
  @IsNotEmpty()
  optionD: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-D]$/, { message: 'correctAnswer must be A, B, C, or D' })
  correctAnswer: string;

  @IsString()
  @IsOptional()
  explanation?: string;
}
