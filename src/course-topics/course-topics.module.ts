import { Module } from '@nestjs/common';
import { PaginateModule } from 'src/paginate/paginate.module';
import { CourseTopicsController } from './course-topics.controller';
import { CourseTopicsService } from './course-topics.service';

@Module({
  imports: [PaginateModule],
  controllers: [CourseTopicsController],
  providers: [CourseTopicsService],
})
export class CourseTopicsModule { }
