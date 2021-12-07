import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { LocalsService } from './locals.service';

@UseGuards(JwtGuard)
@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @Post()
  create(@Body() createLocalDto: any) {
    return this.localsService.create(createLocalDto);
  }

  @Get()
  findAll() {
    return this.localsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: any) {
    return this.localsService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localsService.remove(+id);
  }
}
