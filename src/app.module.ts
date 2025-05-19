import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseTopicsModule } from './course-topics/course-topics.module';
import { CoursesModule } from './courses/courses.module';
import { PaginateModule } from './paginate/paginate.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CoursesModule,
    CourseTopicsModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    PaginateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
