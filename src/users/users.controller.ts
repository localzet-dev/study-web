import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ForbiddenException } from '@nestjs/common';
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
  async findOne(@Param('id') id: number, @Body() body: { userId: number }) {
    const user = await this.usersService.findOne(id);

    if (user.id !== body.userId && user.role !== 'admin') {
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
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return { message: UserMessages.UPDATED_SUCCESS, user };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id);
    return { message: UserMessages.DELETED_SUCCESS };
  }
}
