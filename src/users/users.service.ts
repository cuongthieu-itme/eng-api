import { Injectable } from '@nestjs/common';
import { PaginateService } from 'src/paginate/paginate.service';
import { PaginateOptions } from 'src/paginate/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) {}

  async findAll(paginateOptions?: PaginateOptions, where: any = {}) {
    return this.paginateService.paginator({
      model: this.prisma.user,
      paginate: {
        ...paginateOptions,
        pagination: true,
      },
      condition: {
        where,
      },
      includeOrSelect: {
        operator: 'select',
        value: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        id,
      },
    });
    return user;
  }

  async create(createUserDto: any) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateHashedRefreshedToken(id: string, hashedRefreshToken: any) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedRefreshToken,
      },
    });
    return user;
  }
}
