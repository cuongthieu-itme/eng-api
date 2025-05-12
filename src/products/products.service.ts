import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/utils/types';
import { Prisma, Product } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ProductsService {
  private readonly s3Client;
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private request: RequestWithUser,
    private readonly config: ConfigService,
  ) {
    this.s3Client = new S3({
      accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
    });
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const productDetails =
        createProductDto.productDetails as Prisma.JsonValue;
      const product: Product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          category: {
            connect: {
              id: createProductDto.category,
            },
          },
          productDetails,
        },
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async uploadImages(files: Array<Express.Multer.File>, id: string) {
    console.log('id', id);
    const uploadedImages = [];
    let uploadedFile;
    try {
      // async for loop to upload each file
      for (const file of files) {
        uploadedFile = await this.s3Client
          .upload({
            Bucket: this.config.get('AWS_BUCKET_NAME'),
            Body: file.buffer,
            Key: file.originalname,
            ACL: 'public-read',
            ContentDisposition: 'inline',
          })
          .promise();
        console.log('uploadedFile', uploadedFile);

        uploadedImages.push(uploadedFile.Location);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not upload images',
        error.message,
      );
    }

    try {
      // const names = files.map((file) => file.originalname);
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          images: { push: uploadedImages },
          backgroundImage: uploadedImages[0],
        },
      });
      if (!product) {
        throw new InternalServerErrorException('Product could not be updated');
      }

      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const allProducts = await this.prisma.product.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return allProducts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product: Product = await this.prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} ${updateProductDto} product`;
  }

  async remove(id: string): Promise<Product> {
    try {
      const product: Product = await this.prisma.product.delete({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
