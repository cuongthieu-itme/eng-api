import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: any) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
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
    console.log('here', { id, hashedRefreshToken });
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
