import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ForbiddenException, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto, UpdateUserDto, UserMessages } from './users.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new ForbiddenException(`ID ${id} не является валидным числом.`);
    }

    const user = await this.usersService.findOne(numericId);

    const currentUser = req.user;

    if (user.id !== currentUser.userId && currentUser.role !== 'admin') {
      throw new ForbiddenException(UserMessages.FORBIDDEN_ACCESS);
    }

    return user;
  }

  @Roles('admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: UserMessages.CREATED_SUCCESS, user };
  }

  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), updateUserDto);
    return { message: UserMessages.UPDATED_SUCCESS, user };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(parseInt(id));
    return { message: UserMessages.DELETED_SUCCESS };
  }
}
