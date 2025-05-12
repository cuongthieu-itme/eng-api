import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/utils/types';
import { Address } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private request: RequestWithUser,
  ) {}
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const userId = this.request.user.id;

    try {
      const address = await this.prisma.address.create({
        data: {
          ...createAddressDto,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return address;
    } catch (error) {
      throw new BadRequestException('Could not create address', error.message);
    }
  }

  async findAll(): Promise<Address[]> {
    const userId = this.request.user.id;

    const addresses = await this.prisma.address.findMany({
      where: {
        userId,
      },
    });
    return addresses;
  }

  async findOne(id: string): Promise<Address> {
    const userId = this.request.user.id;

    const address = await this.prisma.address.findFirst({
      where: {
        id,
      },
    });
    if (!address) throw new BadRequestException('Address not found');
    if (address.userId !== userId)
      throw new BadRequestException(
        'You do not have permission to access this resource',
      );
    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const userId = this.request.user.id;

    const address = await this.prisma.address.findFirst({
      where: {
        id,
      },
    });
    if (!address) throw new BadRequestException('Address not found');
    if (address.userId !== userId)
      throw new BadRequestException(
        'You do not have permission to update this resource',
      );

    const addressUpdated = this.prisma.address.update({
      where: {
        id,
      },
      data: updateAddressDto,
    });

    return addressUpdated;
  }

  async remove(id: string) {
    const userId = this.request.user.id;

    const address = await this.prisma.address.findFirst({
      where: {
        id,
      },
    });
    if (!address) throw new BadRequestException('Address not found');
    if (address.userId !== userId)
      throw new BadRequestException(
        'You do not have permission to access this',
      );

    await this.prisma.address.delete({
      where: {
        id,
      },
    });
    return address;
  }
}
