import { Module } from '@nestjs/common';
import { PaginateModule } from 'src/paginate/paginate.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [PaginateModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
