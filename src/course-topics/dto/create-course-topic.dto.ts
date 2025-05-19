import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseTopicDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
