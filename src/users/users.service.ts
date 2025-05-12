import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
          // Omitting password and hashedRefreshToken for security
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createUserDto: any) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
