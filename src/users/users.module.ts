import { Module } from '@nestjs/common';
import { PaginateModule } from 'src/paginate/paginate.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PaginateModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
