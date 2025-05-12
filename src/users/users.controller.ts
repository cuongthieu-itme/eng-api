import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
}
