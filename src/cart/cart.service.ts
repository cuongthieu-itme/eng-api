import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/utils/types';
import { Cart, User } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private request: RequestWithUser,
  ) {}
  @OnEvent('user.created')
  async create(user: User): Promise<Cart> {
    try {
      const cart: Cart = await this.prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
      return cart;
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not create cart',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Cart> {
    try {
      const cart: Cart = await this.prisma.cart.findUnique({
        where: {
          id,
        },
      });
      if (!cart) {
        throw new InternalServerErrorException('Cart not found');
      }

      const userId = this.request.user.id;
      if (cart.userId !== userId) {
        throw new InternalServerErrorException(
          'You do not have permission to access this resource',
        );
      }
      return cart;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(updateCartDto: UpdateCartDto) {
    const userId = this.request.user.id;
    const userCart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });
    try {
      const { actionType } = updateCartDto;
      if (actionType === 'emptyCart') {
        const updatedCart = await this.prisma.cart.update({
          where: {
            id: userCart.id,
          },
          data: {
            totalPrice: {
              set: 0,
            },
            cartItems: {
              deleteMany: {},
            },
          },
        });
        return updatedCart;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not empty cart',
        error.message,
      );
    }
  }

  @OnEvent('cartItem.created')
  async updateCart(updateCartDto: UpdateCartDto) {
    try {
      const { actionType, cartItem, quantity } = updateCartDto;
      if (actionType === 'add') {
        const incomingProductsPrices = cartItem?.product.price * quantity;
        const updatedCart = await this.prisma.cart.update({
          where: {
            id: cartItem.cartId,
          },
          data: {
            totalPrice: {
              increment: incomingProductsPrices, // Corrected spelling here
            },
          },
        });

        return updatedCart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
