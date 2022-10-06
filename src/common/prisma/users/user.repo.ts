import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(email: string, password: string): Promise<User> {
    const data = { email, password };
    return this.prisma.user.create({
      data,
    });
  }
  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async find(email: string): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      where: {
        email: email,
      },
    });

    return user;
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...attrs,
      },
    });

    return updateUser;
  }

  async remove(id: number): Promise<User> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return deleteUser;
  }
}
