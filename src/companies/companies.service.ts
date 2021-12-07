import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: any) {
    try {
      const user = await this.prisma.company.create({
        data: createCompanyDto,
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findAll() {
    try {
      const user = await this.prisma.company.findMany()

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.company.findUnique({
        where: {
          id: +id
        },
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async update(id: number, updateCompanyDto: any) {
    try {
      const user = await this.prisma.company.update({
        where: {
          id: +id
        },
        data: updateCompanyDto
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.company.delete({
        where: {
          id: +id
        },
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }
}
