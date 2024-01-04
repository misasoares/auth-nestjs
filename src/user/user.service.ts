import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.users.create({
      data,
    });

    return { ...createdUser, password: undefined };
  }

  async findAll() {
    const data = await this.prisma.users.findMany();
    return {
      message: 'Usuários listados com sucesso.',
      data,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: string) {
    const data = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    return {
      message: 'Usuário listado com sucesso.',
      data,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const saltRounds = 10;
    const hashedPasssword = await bcrypt.hash(
      updateUserDto.password,
      saltRounds,
    );

    const data = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: hashedPasssword,
      },
    });
    return {
      message: 'Usuário alterado com sucesso.',
      data,
    };
  }

  async remove(id: string) {
    const data = await this.prisma.users.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Usuário deletado com sucesso.',
      data,
    };
  }
}
