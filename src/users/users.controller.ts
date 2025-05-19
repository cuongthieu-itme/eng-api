import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('pagination') pagination?: string,
    @Query('search') search?: string,
    @Query('email') email?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('role') role?: string,
  ) {
    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (firstName)
      where.firstName = { contains: firstName, mode: 'insensitive' };
    if (lastName) where.lastName = { contains: lastName, mode: 'insensitive' };
    if (role) where.role = role;

    return this.usersService.findAll(
      {
        page,
        limit,
        pagination: pagination ? pagination === 'true' : true,
      },
      where,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
}
