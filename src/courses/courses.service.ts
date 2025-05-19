import { Injectable } from '@nestjs/common';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateOptions } from 'src/paginate/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) { }

  async create(createCourseDto: CreateCourseDto, userId: string) {
    const { topics, ...courseData } = createCourseDto;

    const course = await this.prisma.course.create({
      data: {
        ...courseData,
        createdBy: {
          connect: { id: userId },
        },
      },
    });

    if (topics && topics.length > 0) {
      await this.prisma.courseTopic.createMany({
        data: topics.map((topic) => ({
          courseId: course.id,
          topic,
        })),
      });
    }

    return course;
  }

  async findAll(paginateOptions?: PaginateOptions, where: any = {}) {
    return this.paginateService.paginator({
      model: this.prisma.course,
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
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          topics: true,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        topics: true,
      },
    });
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const { topics, ...courseData } = updateCourseDto;

    const course = await this.prisma.course.update({
      where: { id },
      data: courseData,
    });

    if (topics) {
      await this.prisma.courseTopic.deleteMany({
        where: { courseId: id },
      });

      if (topics.length > 0) {
        await this.prisma.courseTopic.createMany({
          data: topics.map((topic) => ({
            courseId: id,
            topic,
          })),
        });
      }
    }

    return course;
  }

  async remove(id: string) {
    await this.prisma.courseTopic.deleteMany({
      where: { courseId: id },
    });

    const course = await this.prisma.course.delete({
      where: { id },
    });

    return course;
  }
}
