import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/utils/types';
import { Address, Order } from '@prisma/client';
import crypto from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private request: RequestWithUser,
  ) {}
  async create() {
    const { user } = this.request;
    const userCart = await this.prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        cartItems: true,
      },
    });

    const userAddresses: Address[] = await this.prisma.address.findMany({
      where: {},
    });

    const primaryAddress: Address = userAddresses.find(
      (address) => address.isDefaultAddress === true,
    );

    for (const cartItem of userCart.cartItems) {
      await this.prisma.order.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          orderId: crypto.randomBytes(10).toString('hex'),
          cartItem: {
            connect: {
              id: cartItem.id,
            },
          },
          address: {
            connect: {
              id: primaryAddress.id,
            },
          },
        },
      });
    }
    return { message: 'Order created successfully' };
  }

  async findAll(): Promise<Order[]> {
    try {
      const { user } = this.request;

      const orders = await this.prisma.order.findMany({
        where: {
          user: {
            id: user.id,
          },
        },
        include: {
          cartItem: true,
        },
      });
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    const { user } = this.request;
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: id,
          user,
        },
        include: {
          cartItem: true,
        },
      });
      if (!order) throw new NotFoundException('Order not found');
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const { user } = this.request;

      const order = await this.prisma.order.delete({
        where: {
          orderId: id,
          user,
        },
      });

      if (!order) throw new NotFoundException('Order not found');

      return order;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
