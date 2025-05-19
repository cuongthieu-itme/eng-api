import { Injectable } from '@nestjs/common';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateOptions } from 'src/paginate/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) { }

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const { lectureId, ...restData } = createQuestionDto;
    const question = await this.prisma.question.create({
      data: {
        ...restData,
        lecture: {
          connect: { id: lectureId },
        },
        createdBy: {
          connect: { id: userId },
        },
      },
    });
    return question;
  }

  async findAll(paginateOptions?: PaginateOptions, where: any = {}) {
    return this.paginateService.paginator({
      model: this.prisma.question,
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
          lecture: {
            select: {
              id: true,
              title: true,
              courseId: true,
              course: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        lecture: {
          select: {
            id: true,
            title: true,
            courseId: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
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
    });
    return question;
  }

  async findByLecture(lectureId: string) {
    const questions = await this.prisma.question.findMany({
      where: { lectureId },
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
    return questions;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
    return question;
  }

  async remove(id: string) {
    const question = await this.prisma.question.delete({
      where: { id },
    });
    return question;
  }
}
