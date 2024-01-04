import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name, value, description } = createProductDto;

    const data = await this.prisma.products.create({
      data: {
        name,
        value,
        description,
      },
    });

    return {
      message: 'Produto criado com sucesso.',
      data,
    };
  }

  async findAll() {
    const data = await this.prisma.products.findMany();
    return {
      message: 'Produtos listados com sucesso.',
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    return {
      message: 'Produto encontrado com sucesso.',
      data,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.name === '' || updateProductDto.description === '') {
      return {
        message: 'Preencha todos os campos',
      };
    }

    const data = await this.prisma.products.update({
      where: {
        id,
      },
      data: {
        name: updateProductDto.name,
        value: updateProductDto.value,
        description: updateProductDto.description,
      },
    });
    return {
      message: 'Produto atualizado com sucesso.',
      data,
    };
  }

  async remove(id: string) {
    const data = await this.prisma.products.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Produto deletado com sucesso',
      data,
    };
  }
}
