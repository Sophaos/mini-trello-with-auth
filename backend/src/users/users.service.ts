import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, FindOneUserDTO } from './users.dto';
import { UserType } from 'src/types/user.type';
import { toUserType } from 'src/mappers/user.mapper';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<UserType> {
    const user = await this.prisma.user.create({ data });
    return toUserType(user);
  }

  async findOneById(id: number): Promise<UserType> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return toUserType(user);
    } catch (e) {
      console.error(e);
      throw new Error('Internal server error');
    }
  }

  async findOne(findOneUserDTO: FindOneUserDTO): Promise<UserType> {
    const user = await this.findOneRaw(findOneUserDTO);
    return toUserType(user);
  }

  async findOneRaw(findOneUserDTO: FindOneUserDTO): Promise<User> {
    const { email } = findOneUserDTO;
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (e) {
      console.error(e);
      throw new Error('Internal server error');
    }
  }
}
