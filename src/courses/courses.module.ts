import { Module } from '@nestjs/common';
import { PaginateModule } from 'src/paginate/paginate.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [PaginateModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
