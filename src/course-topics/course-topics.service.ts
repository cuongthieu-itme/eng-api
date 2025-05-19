import { Injectable } from '@nestjs/common';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateOptions } from 'src/paginate/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseTopicDto } from './dto/create-course-topic.dto';
import { UpdateCourseTopicDto } from './dto/update-course-topic.dto';

@Injectable()
export class CourseTopicsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) { }

  async create(createCourseTopicDto: CreateCourseTopicDto) {
    const courseTopic = await this.prisma.courseTopic.create({
      data: createCourseTopicDto,
    });
    return courseTopic;
  }

  async findAll(paginateOptions?: PaginateOptions, where: any = {}) {
    return this.paginateService.paginator({
      model: this.prisma.courseTopic,
      paginate: {
        ...paginateOptions,
        pagination: true,
      },
      condition: {
        where,
      },
      includeOrSelect: {
        operator: 'include',
        value: {
          course: {
            select: {
              id: true,
              name: true,
              subject: true,
            },
          },
        },
      },
      orderBy: {
        topic: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const courseTopic = await this.prisma.courseTopic.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            subject: true,
          },
        },
      },
    });
    return courseTopic;
  }

  async findByCourse(courseId: string) {
    const courseTopics = await this.prisma.courseTopic.findMany({
      where: { courseId },
      orderBy: {
        topic: 'asc',
      },
    });
    return courseTopics;
  }

  async update(id: string, updateCourseTopicDto: UpdateCourseTopicDto) {
    const courseTopic = await this.prisma.courseTopic.update({
      where: { id },
      data: updateCourseTopicDto,
    });
    return courseTopic;
  }

  async remove(id: string) {
    const courseTopic = await this.prisma.courseTopic.delete({
      where: { id },
    });
    return courseTopic;
  }
}
