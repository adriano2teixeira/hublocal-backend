import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocalsService {
  constructor(private prisma: PrismaService) {}

  async create(createLocal: any) {
    try {
      const local = await this.prisma.manager.create({
        data: createLocal,
      });

      return local;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findAll() {
    try {
      const locals = await this.prisma.manager.findMany();

      return locals;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const local = await this.prisma.manager.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!local) {
        throw new HttpException({ error: 'local not found' }, 404);
      }

      return local;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async update(id: number, updateLocal: any) {
    try {
      const local = await this.prisma.manager.update({
        where: {
          id: Number(id),
        },
        data: updateLocal,
      });

      return local;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async remove(id: number) {
    try {
      const local = await this.prisma.manager.delete({
        where: {
          id: Number(id),
        },
      });

      return local;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }
}
