import { Injectable } from '@nestjs/common';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateOptions } from 'src/paginate/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) { }

  async create(createLectureDto: CreateLectureDto, userId: string) {
    const { courseId, ...restData } = createLectureDto;
    const lecture = await this.prisma.lecture.create({
      data: {
        ...restData,
        course: {
          connect: { id: courseId },
        },
        createdBy: {
          connect: { id: userId },
        },
      },
    });
    return lecture;
  }

  async findAll(paginateOptions?: PaginateOptions, where: any = {}) {
    return this.paginateService.paginator({
      model: this.prisma.lecture,
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
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            subject: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: true,
      },
    });
    return lecture;
  }

  async findByCourse(courseId: string) {
    const lectures = await this.prisma.lecture.findMany({
      where: { courseId },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return lectures;
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    const lecture = await this.prisma.lecture.update({
      where: { id },
      data: updateLectureDto,
    });
    return lecture;
  }

  async remove(id: string) {
    await this.prisma.question.deleteMany({
      where: { lectureId: id },
    });

    const lecture = await this.prisma.lecture.delete({
      where: { id },
    });
    return lecture;
  }
}
