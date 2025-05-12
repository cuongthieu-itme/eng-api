import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { RequestWithUser } from 'src/utils/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private request: RequestWithUser,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
    try {
      const { productId, quantity, actionType } = createCartItemDto;

      const user = await this.prisma.user.findUnique({
        where: {
          id: this.request.user.id,
        },
        include: {
          Cart: {
            include: {
              cartItems: true,
            },
          },
        },
      });
      if (!user) throw new Error('Could not add this product to cart');
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (product && product.stock < quantity) {
        throw new BadRequestException(
          'Product stock is not enough to add to cart',
        );
      }
      //check if the product is already in the cart
      const isCartItemInCart = user.Cart.cartItems.find(
        (cartItem) => cartItem.productId === productId,
      );
      if (isCartItemInCart) {
        const updatedCartItem = await this.prisma.cartItem.update({
          where: {
            id: isCartItemInCart.id,
          },
          data: {
            quantity: quantity + isCartItemInCart.quantity,
          },
          include: {
            product: true,
            cart: true,
          },
        });
        this.eventEmitter.emit('cartItem.created', {
          cartItem: updatedCartItem,
          quantity: quantity,
          actionType: actionType,
        });
        return updatedCartItem;
      }
      const newCartItem = await this.prisma.cartItem.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
          quantity,
          cart: {
            connect: {
              id: user.Cart.id,
            },
          },
        },
        include: {
          product: true,
          cart: true,
        },
      });
      if (!newCartItem)
        throw new Error(`Could not parse the current market price for )`);
      this.eventEmitter.emit('cartItem.created', {
        cartItem: newCartItem,
        quantity: quantity,
        actionType: actionType,
      });
      return newCartItem;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
