import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ForbiddenException} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {RolesGuard} from '../auth/roles.guard';
import {Roles} from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Защита маршрутов с проверкой JWT и ролей
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Roles('admin')
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Roles('admin', 'user')
    @Get(':id')
    async findOne(@Param('id') id: string, @Body() body: { userId: number }) {
        const user = await this.usersService.findOne(+id);

        if (user.id !== body.userId && user.role !== 'admin') {
            throw new ForbiddenException('You do not have access to this resource');
        }

        return user;
    }

    @Roles('admin')
    @Post()
    async create(@Body() body: { name: string; email: string; password: string; role: string }) {
        return this.usersService.create(body);
    }

    @Roles('admin')
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<{
        name: string;
        email: string;
        password: string;
        role: string
    }>) {
        return this.usersService.update(+id, body);
    }

    @Roles('admin')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
