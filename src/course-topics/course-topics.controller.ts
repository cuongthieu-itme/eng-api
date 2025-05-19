import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CourseTopicsService } from './course-topics.service';
import { CreateCourseTopicDto } from './dto/create-course-topic.dto';
import { UpdateCourseTopicDto } from './dto/update-course-topic.dto';

@Controller('course-topics')
export class CourseTopicsController {
  constructor(private readonly courseTopicsService: CourseTopicsService) { }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCourseTopicDto: CreateCourseTopicDto) {
    return this.courseTopicsService.create(createCourseTopicDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('pagination') pagination?: string,
    @Query('courseId') courseId?: string,
    @Query('topic') topic?: string,
  ) {
    const where: any = {};

    if (courseId) where.courseId = courseId;
    if (topic) where.topic = { contains: topic, mode: 'insensitive' };

    return this.courseTopicsService.findAll(
      {
        page,
        limit,
        pagination: pagination ? pagination === 'true' : true,
      },
      where,
    );
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.courseTopicsService.findByCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseTopicsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseTopicDto: UpdateCourseTopicDto,
  ) {
    return this.courseTopicsService.update(id, updateCourseTopicDto);
  }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseTopicsService.remove(id);
  }
}
