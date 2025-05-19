import { Module } from '@nestjs/common';
import { PaginateModule } from 'src/paginate/paginate.module';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';

@Module({
  imports: [PaginateModule],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule { }
