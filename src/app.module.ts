import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { LocalsModule } from './locals/locals.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [UsersModule, LocalsModule, AuthModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
