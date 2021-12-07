import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from "../auth/auth.service";

interface iLoginBody {
  phone: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService, 
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService) {}

 async singIn ({ phone, password }: iLoginBody) {
  try {
    const user = await this.prisma.manager.findFirst({
      where: { phone, password },
    });

   if(user) {
     const token = await this.authService.login(user)
     return {...user , token }
   }

    return user;
  } catch (error) {
    throw new HttpException({ error: error.message, status: error.status }, error.status);
  }
 }

  async create(createUserDto: any) {
    try {
      const user = await this.prisma.manager.create({
        data: createUserDto,
      });

      

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.manager.findMany();

      return users;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.manager.findUnique({
        where: {
          id: Number(id),
        },
      });

       if (!user) {
        throw new HttpException({ error: 'user  not found!' }, 404);
      }

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async findUnique(query: any) {
    try {
      const user = await this.prisma.manager.findUnique({
        where: {
          ...query,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async update(id: number, updateUserDto: any) {
    try {
      const user = await this.prisma.manager.update({
        where: {
          id: Number(id),
        },
        data: updateUserDto,
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.manager.delete({
        where: {
          id: Number(id),
        },
      });

      return user;
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }
}
